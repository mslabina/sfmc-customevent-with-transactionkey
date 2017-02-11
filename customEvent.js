'use strict';

define(function (require) {
	var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};

	// The steps of the configuration dialog which should be identical to wizardSteps in config.json
	var steps = [
		{'key': 'selectDataExtensionId', 'label': 'Select DE'},
		{'key': 'selectTransactionKey', 'label': 'Transaction Key'}
	];
	var currentStep = steps[0].key;

	function initialize (payload) {
		var transactionKeyEvent;
		var transactionKeyDataExtension;
		var dataExtensionId;

		if (payload && payload['arguments']) {
			transactionKeyEvent = payload['arguments'].transactionKeyEvent;
			transactionKeyDataExtension = payload['arguments'].transactionKeyDataExtension;
			dataExtensionId = payload['arguments'].dataExtensionId;
		}

		$('#select-dataextension-id').val(dataExtensionId);
		$('#select-transkey-event').val(transactionKeyEvent);
		$('#select-transkey-dataextension').val(transactionKeyDataExtension);
	}

	$(window).ready(function () {
		connection.trigger('ready');
	});

	function onClickedNext () {
		if (currentStep.key === 'selectTransactionKey') {
			save();
		} else {
			connection.trigger('nextStep');
		}
	}

	function save () {
		// Read the dataextension id from the first wizard step's form
		var dataExtensionId = $('#select-dataextension-id').val();

		// Read the transaction key column and dataextension name from the second wizard step's form
		var transactionKeyEvent = $('#select-transkey-event').val();
		var transactionKeyDataExtension = $('#select-transkey-dataextension').val();

		// Read the automatically added step's field as otherwise the custom event
		// definition key would be overwritten. Unfortunately the form input doesn't
		// have an id, so we use the class.. (Name and description aren't overwritten,
		// so we don't need to read these values)
		var eventDefinitionKey = $('input.form-control.event-definition-key').val();

		payload['dataExtensionId'] = dataExtensionId;

		payload['eventDefinitionKey'] = eventDefinitionKey;

		payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].dataExtensionId = dataExtensionId;
		payload['arguments'].transactionKeyEvent = transactionKeyEvent;
		payload['arguments'].transactionKeyDataExtension = transactionKeyDataExtension;

		payload['configurationArguments'] = payload['configurationArguments'] || {};
		payload['configurationArguments'].dataExtensionId = dataExtensionId;

		payload['metaData'] = payload['metaData'] || {};
		payload['metaData'].isConfigured = true;
		payload['metaData'].transactionKeys = {
			'0': {
				'from': transactionKeyEvent,
				'to': transactionKeyDataExtension
			}
		};

		connection.trigger('updateEvent', payload);
	}

	function onClickedBack () {
		connection.trigger('prevStep');
	}

	function onGotoStep (step) {
		showStep(step);
		connection.trigger('ready');
	}

	function showStep (step, stepIndex) {
		if (stepIndex && !step) {
			step = steps[stepIndex - 1];
		}

		currentStep = step;

		$('.step').hide();

		switch 	(currentStep.key) {
		case 'selectDataExtensionId':
			$('#step1').show();
			$('#step1 input').focus();
			break;
		case 'selectTransactionKey':
			$('#step2').show();
			$('#step2 input').first().focus();
			break;
		}
	}

	// Register eventlisteners
	connection.on('initEvent', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
});
