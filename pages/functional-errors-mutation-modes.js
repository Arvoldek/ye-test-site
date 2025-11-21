const modes = {
    show: 'show',
    hide: 'hide',
};

const MESSAGE_TYPES = {
    DEFAULT: 'default-message',
    ERROR: 'error-message',
    WARNING: 'warning-message',
};

const BUTTON_CLASSES = {
    MUTATE: 'submit-button--mutate',
    CLEAR: 'submit-button--clear',
};

const BUTTON_TEXT = {
    START_MUTATION: 'Start Mutation',
    STOP_MUTATION: 'Stop Mutation',
};

const errorMessages = [
    'Connection timeout. Please check your network.',
    'Invalid email address format.',
    'Password must be at least 8 characters long.',
    'Username is already taken.',
    'Form validation failed. Please check all required fields.',
    'Session has expired. Please log in again.',
    'Payment processing failed. Please try again.',
    'File upload failed. Maximum size exceeded.',
    'Database connection error. Please contact support.',
    'API request failed with status 500.',
    'Authentication token is invalid or expired.',
    "Permission denied. You don't have access to this resource.",
    'Rate limit exceeded. Please try again later.',
    'Invalid credit card number.',
    'Shipping address is incomplete.',
    'Product is out of stock.',
    'Coupon code has expired or is invalid.',
    'Email delivery failed. Please verify your email address.',
    'Server error occurred. Please refresh the page.',
    'Data synchronization failed. Please try again.',
];

const warningMessages = [
    'Your session will expire in 5 minutes.',
    'Low disk space. Consider freeing up some storage.',
    'This action cannot be undone.',
    'Password strength is weak. Consider using a stronger password.',
    'Unsaved changes detected.',
    'Network connection is unstable.',
    'Browser cache is full. Performance may be affected.',
    'This feature is deprecated and will be removed soon.',
    'File size is larger than recommended.',
    'You are using an outdated browser version.',
    'SSL certificate will expire soon.',
    'Multiple login attempts detected.',
    'Cookie preferences not set.',
    'Third-party cookies are blocked.',
    'Pop-ups are disabled for this site.',
];

const generateRandomErrorText = () => {
    return errorMessages[Math.floor(Math.random() * errorMessages.length)];
};

const generateRandomWarningText = () => {
    return warningMessages[Math.floor(Math.random() * warningMessages.length)];
};

const generateDefaultMessage = (suffix = '') => {
    const templateId = `${MESSAGE_TYPES.DEFAULT}-template`;
    const placeholderTemplate = document.getElementById(templateId);
    if (!placeholderTemplate) {
        throw new Error('Placeholder template not found');
    }
    const message = placeholderTemplate.content.cloneNode(true);
    const baseText = 'Click on the "Create Message" button to generate errors.';
    message.querySelector('b').textContent = 'Message:';
    message.querySelector('p').textContent = suffix
        ? baseText + ' (' + suffix + ')'
        : baseText;
    return message;
};

const removeDefaultMessage = (element) => {
    const defaultMessage = element.querySelector(`#${MESSAGE_TYPES.DEFAULT}`);
    if (!defaultMessage) {
        throw new Error('Default message not found');
    }
    defaultMessage.remove();
};

const generateErrorMessage = (suffix = '') => {
    // Randomly choose between error (70%) and warning (30%)
    const isWarning = Math.random() < 0.3;
    const templateId = isWarning ? 'warning-message-template' : 'error-message-template';
    const template = document.getElementById(templateId);

    if (!template) {
        throw new Error(`${templateId} not found`);
    }

    const message = template.content.cloneNode(true);
    const label = isWarning ? 'Warning:' : 'Error:';
    const baseText = isWarning ? generateRandomWarningText() : generateRandomErrorText();
    const textContent = suffix ? baseText + ' (' + suffix + ')' : baseText;

    message.querySelector('b').textContent = label;
    message.querySelector('p').textContent = textContent;

    return message;
};

const removeErrorMessage = (element) => {
    const errorMessage = element.querySelector('#error-message');
    const warningMessage = element.querySelector('#warning-message');

    if (errorMessage) {
        errorMessage.remove();
    } else if (warningMessage) {
        warningMessage.remove();
    } else {
        throw new Error('Error or warning message not found');
    }
};

const generateAndAddMessages = (element, noOfContainers, identifier = '') => {
    for (let idx = 0; idx < noOfContainers; idx++) {
        const messageContainer = generateDefaultMessage();
        element.prepend(messageContainer);
        element.children[0].setAttribute('tc-id', `${identifier}--${idx}`);
    }
};

const generateTestCase = () => {
    const testCaseTemplate = document.getElementById('test-case-template');
    if (!testCaseTemplate) {
        throw new Error('Test case template not found');
    }
    return testCaseTemplate.content.cloneNode(true);
};

const setTestCaseInfo = (element, title, description) => {
    const titleElement = element.querySelector('#title');
    if (!titleElement) {
        throw new Error('Title element not found');
    }
    titleElement.textContent = title;

    const descriptionElement = element.querySelector('#description');
    if (!descriptionElement) {
        throw new Error('Description element not found');
    }
    descriptionElement.textContent = description;
};

const getContentWrapper = () => {
    const contentWrapper = document.getElementById('content-wrapper');
    if (!contentWrapper) {
        throw new Error('Content wrapper not found');
    }
    return contentWrapper;
};

const getMessageContainer = (element) => {
    const messageContainer = element.querySelector('.card-body > .messages');
    if (!messageContainer) {
        throw new Error('Message container not found');
    }
    return messageContainer;
};

const updateMessageInPlace = (element, type, text = '', suffix = '') => {
    element.id = type;

    const b = element.querySelector('b');
    const p = element.querySelector('p');

    if (!b || !p) {
        throw new Error('Message structure is invalid - missing b or p elements');
    }

    if (type === MESSAGE_TYPES.DEFAULT) {
        b.textContent = 'Message:';
        const baseText = 'Click on the "Create Message" button to generate errors.';
        p.textContent = suffix ? baseText + ' (' + suffix + ')' : baseText;
    } else if (type === MESSAGE_TYPES.ERROR) {
        b.textContent = 'Error:';
        p.textContent = text;
    } else {
        b.textContent = 'Warning:';
        p.textContent = text;
    }
};

const replaceMessageContainer = (messageContainer, idx, newMessage) => {
    const parent = messageContainer.parentElement;
    if (!parent) {
        throw new Error('Message container has no parent element');
    }

    const newContainer = messageContainer.cloneNode(true);
    const newElement = newMessage.firstElementChild || newMessage;
    newContainer.replaceChild(newElement.cloneNode(true), newContainer.children[idx]);

    messageContainer.remove();
    parent.appendChild(newContainer);

    return newContainer;
};

const changeErrorMessage = (messageContainer, idx, attributesMode = false) => {
    const currentMessage = messageContainer.children[idx];

    if (attributesMode) {
        const isWarning = Math.random() < 0.3;
        const type = isWarning ? MESSAGE_TYPES.WARNING : MESSAGE_TYPES.ERROR;
        const baseText = isWarning
            ? generateRandomWarningText()
            : generateRandomErrorText();
        const text = baseText + ' (Attributes Change Mode)';
        updateMessageInPlace(currentMessage, type, text);
        return messageContainer;
    }

    const newMessage = generateErrorMessage('Insert Node Mode');
    return replaceMessageContainer(messageContainer, idx, newMessage);
};

const clearMessage = (messageContainer, idx, attributesMode = false) => {
    const currentMessage = messageContainer.children[idx];
    if (currentMessage.id === MESSAGE_TYPES.DEFAULT) {
        return messageContainer;
    }

    if (attributesMode) {
        updateMessageInPlace(
            currentMessage,
            MESSAGE_TYPES.DEFAULT,
            '',
            'Attributes Change Mode'
        );
        return messageContainer;
    }

    const newMessage = generateDefaultMessage('Insert Node Mode');
    return replaceMessageContainer(messageContainer, idx, newMessage);
};

const shouldUseAttributesMode = (mixedMode, attributesMode) => {
    return mixedMode ? Math.random() < 0.5 : attributesMode;
};

const mutateAllMessages = (tc, mutationFn, mixedMode, attributesMode) => {
    let messageContainer = getMessageContainer(tc);
    for (let idx = 0; idx < messageContainer.children.length; idx++) {
        const useAttributesMode = shouldUseAttributesMode(mixedMode, attributesMode);
        messageContainer = mutationFn(messageContainer, idx, useAttributesMode);
    }
    return messageContainer;
};

const clearAllMessages = (tc, mixedMode, attributesMode) => {
    return mutateAllMessages(tc, clearMessage, mixedMode, attributesMode);
};

const createMutateRandomlyHandler = (messageContainer, mixedMode, attributesMode) => {
    return () => {
        let currentContainer = messageContainer;
        for (let idx = 0; idx < currentContainer.children.length; idx++) {
            const shouldCycleErrors = Math.random() < 0.5;
            const currentMessage = currentContainer.children[idx];
            const isDefaultMessage = currentMessage.id === MESSAGE_TYPES.DEFAULT;
            const useAttributesMode = shouldUseAttributesMode(mixedMode, attributesMode);

            if (!shouldCycleErrors && !isDefaultMessage) {
                currentContainer = clearMessage(currentContainer, idx, useAttributesMode);
                continue;
            }

            if (!shouldCycleErrors) {
                currentContainer = changeErrorMessage(
                    currentContainer,
                    idx,
                    useAttributesMode
                );
                continue;
            }

            currentContainer = changeErrorMessage(
                currentContainer,
                idx,
                useAttributesMode
            );
        }
        messageContainer = currentContainer;
    };
};

const createMutateErrorsHandler = (messageContainer, mixedMode, attributesMode) => {
    return () => {
        let currentContainer = messageContainer;
        for (let idx = 0; idx < currentContainer.children.length; idx++) {
            const useAttributesMode = shouldUseAttributesMode(mixedMode, attributesMode);
            currentContainer = changeErrorMessage(
                currentContainer,
                idx,
                useAttributesMode
            );
        }
        messageContainer = currentContainer;
    };
};

const createMutateStatesHandler = (
    messageContainer,
    mixedMode,
    attributesMode,
    errorStateRef
) => {
    return () => {
        let currentContainer = messageContainer;
        for (let idx = 0; idx < currentContainer.children.length; idx++) {
            const useAttributesMode = shouldUseAttributesMode(mixedMode, attributesMode);
            if (errorStateRef.value) {
                currentContainer = clearMessage(currentContainer, idx, useAttributesMode);
            } else {
                currentContainer = changeErrorMessage(
                    currentContainer,
                    idx,
                    useAttributesMode
                );
            }
        }
        messageContainer = currentContainer;
        errorStateRef.value = !errorStateRef.value;
    };
};

const updateButtonForStartMutation = (submitBtn, manualTriggerBtn, clearMessagesBtn) => {
    manualTriggerBtn.style.display = 'none';
    clearMessagesBtn.style.display = 'none';
    submitBtn.textContent = BUTTON_TEXT.STOP_MUTATION;
    submitBtn.classList.remove(BUTTON_CLASSES.MUTATE);
    submitBtn.classList.add(BUTTON_CLASSES.CLEAR);
};

const updateButtonForStopMutation = (submitBtn, manualTriggerBtn, clearMessagesBtn) => {
    submitBtn.textContent = BUTTON_TEXT.START_MUTATION;
    submitBtn.classList.add(BUTTON_CLASSES.MUTATE);
    submitBtn.classList.remove(BUTTON_CLASSES.CLEAR);
    manualTriggerBtn.style.display = '';
    clearMessagesBtn.style.display = 'none';
};

const setupErrorCyclingManualTrigger = (
    tc,
    manualTriggerBtn,
    clearMessagesBtn,
    mixedMode,
    attributesMode
) => {
    manualTriggerBtn.addEventListener('click', () => {
        mutateAllMessages(tc, changeErrorMessage, mixedMode, attributesMode);
        clearMessagesBtn.style.display = '';
    });
};

const setupRandomManualTrigger = (
    tc,
    manualTriggerBtn,
    clearMessagesBtn,
    mixedMode,
    attributesMode
) => {
    manualTriggerBtn.addEventListener('click', () => {
        let messageContainer = getMessageContainer(tc);

        for (let idx = 0; idx < messageContainer.children.length; idx++) {
            const shouldCycleErrors = Math.random() < 0.5;
            const currentMessage = messageContainer.children[idx];
            const isDefaultMessage = currentMessage.id === MESSAGE_TYPES.DEFAULT;
            const useAttributesMode = shouldUseAttributesMode(mixedMode, attributesMode);

            if (shouldCycleErrors) {
                messageContainer = changeErrorMessage(
                    messageContainer,
                    idx,
                    useAttributesMode
                );
                return;
            }
            if (isDefaultMessage) {
                messageContainer = changeErrorMessage(
                    messageContainer,
                    idx,
                    useAttributesMode
                );
                return;
            }
            messageContainer = clearMessage(messageContainer, idx, useAttributesMode);
        }

        clearMessagesBtn.style.display = '';
    });
};

const setupStateTogglingManualTrigger = (
    tc,
    manualTriggerBtn,
    mixedMode,
    attributesMode
) => {
    let manualIsErrorState = false;

    manualTriggerBtn.addEventListener('click', () => {
        let messageContainer = getMessageContainer(tc);

        for (let idx = 0; idx < messageContainer.children.length; idx++) {
            const useAttributesMode = shouldUseAttributesMode(mixedMode, attributesMode);
            if (manualIsErrorState) {
                messageContainer = clearMessage(messageContainer, idx, useAttributesMode);
            } else {
                messageContainer = changeErrorMessage(
                    messageContainer,
                    idx,
                    useAttributesMode
                );
            }
        }
        manualIsErrorState = !manualIsErrorState;
    });
};

const setupListeners = (tc, mutationConfig = null) => {
    const submitButtons = tc.querySelector('.submit-buttons');
    if (!submitButtons) {
        throw new Error('Submit buttons not found');
    }
    const [submitBtn, manualTriggerBtn, clearMessagesBtn] = Array.from(
        submitButtons.children
    );

    const hasMutationMode = mutationConfig && mutationConfig.mutateAfter !== undefined;

    if (hasMutationMode) {
        setupMutationMode(
            tc,
            submitBtn,
            manualTriggerBtn,
            clearMessagesBtn,
            mutationConfig
        );
    }
};

const setupMutationMode = (
    tc,
    submitBtn,
    manualTriggerBtn,
    clearMessagesBtn,
    {
        mutateAfter,
        mutateErrors = false,
        mutateStates = false,
        mutateRandomly = false,
        attributesMode = false,
        mixedMode = false,
    }
) => {
    let mutationInterval = null;
    const errorStateRef = { value: false };

    const startMutation = () => {
        if (mutationInterval) return;

        updateButtonForStartMutation(submitBtn, manualTriggerBtn, clearMessagesBtn);

        let messageContainer = getMessageContainer(tc);
        const intervalMs = mutateAfter * 1000;

        const doMutateRandomly = createMutateRandomlyHandler(
            messageContainer,
            mixedMode,
            attributesMode
        );
        const doMutateErrors = createMutateErrorsHandler(
            messageContainer,
            mixedMode,
            attributesMode
        );
        const doMutateStates = createMutateStatesHandler(
            messageContainer,
            mixedMode,
            attributesMode,
            errorStateRef
        );

        mutationInterval = setInterval(() => {
            if (mutateRandomly) {
                doMutateRandomly();
                return;
            }
            if (mutateErrors) {
                doMutateErrors();
                return;
            }
            doMutateStates();
        }, intervalMs);
    };

    const stopMutation = () => {
        if (!mutationInterval) {
            mutationInterval = null;
            errorStateRef.value = false;
            return;
        }

        clearInterval(mutationInterval);
        mutationInterval = null;
        errorStateRef.value = false;

        updateButtonForStopMutation(submitBtn, manualTriggerBtn, clearMessagesBtn);
        clearAllMessages(tc, mixedMode, attributesMode);
    };

    submitBtn.addEventListener('click', () => {
        if (!mutationInterval) {
            startMutation();
        } else {
            stopMutation();
        }
    });

    clearMessagesBtn.addEventListener('click', () => {
        if (mutationInterval) {
            clearInterval(mutationInterval);
            mutationInterval = null;
            errorStateRef.value = false;
            updateButtonForStopMutation(submitBtn, manualTriggerBtn, clearMessagesBtn);
        }

        clearAllMessages(tc, mixedMode, attributesMode);
    });

    submitBtn.textContent = BUTTON_TEXT.START_MUTATION;
    submitBtn.classList.add(BUTTON_CLASSES.MUTATE);

    if (mutateErrors) {
        setupErrorCyclingManualTrigger(
            tc,
            manualTriggerBtn,
            clearMessagesBtn,
            mixedMode,
            attributesMode
        );
        return;
    }
    if (mutateRandomly) {
        setupRandomManualTrigger(
            tc,
            manualTriggerBtn,
            clearMessagesBtn,
            mixedMode,
            attributesMode
        );
        return;
    }

    setupStateTogglingManualTrigger(tc, manualTriggerBtn, mixedMode, attributesMode);
};

const initialiseTc = (title, description, count = 1, mutationConfig = null) => {
    try {
        const contentWrapper = getContentWrapper();
        contentWrapper.append(generateTestCase());
        const tc = contentWrapper.children[contentWrapper.children.length - 1];
        setTestCaseInfo(tc, title, description);
        generateAndAddMessages(getMessageContainer(tc), count, 'tc1');
        setupListeners(tc, mutationConfig);
    } catch (error) {
        console.error(error);
    }
};

initialiseTc(
    'State Toggling (Insert Node Mode)',
    'Automatically toggles all messages between shown and hidden states every 1 second.',
    6,
    { mutateAfter: 1, mutateStates: true }
);

initialiseTc(
    'State Toggling (Attributes Change Mode)',
    'Automatically toggles all messages between shown and hidden states every 1 second.',
    6,
    { mutateAfter: 1, mutateStates: true, attributesMode: true }
);

initialiseTc(
    'State Toggling (Mixed Mode)',
    'Toggles states with random choice between Insert Node and Attributes Change per message.',
    6,
    { mutateAfter: 1, mutateStates: true, mixedMode: true }
);

initialiseTc(
    'Error Cycling (Insert Node Mode)',
    'Automatically cycles through different random error and warning messages every 1 second.',
    6,
    { mutateAfter: 1, mutateErrors: true }
);

initialiseTc(
    'Error Cycling (Attributes Change Mode)',
    'Automatically cycles through different random error and warning messages every 1 second.',
    6,
    { mutateAfter: 1, mutateErrors: true, attributesMode: true }
);

initialiseTc(
    'Error Cycling (Mixed Mode)',
    'Cycles errors with random choice between Insert Node and Attributes Change per message.',
    6,
    { mutateAfter: 1, mutateErrors: true, mixedMode: true }
);

initialiseTc(
    'Random (Insert Node Mode)',
    'Each message independently and randomly cycles or toggles every 1 second.',
    6,
    { mutateAfter: 1, mutateRandomly: true }
);

initialiseTc(
    'Random (Attributes Change Mode)',
    'Each message independently and randomly cycles or toggles every 1 second.',
    6,
    { mutateAfter: 1, mutateRandomly: true, attributesMode: true }
);

initialiseTc(
    'Random (Mixed Mode)',
    'Random mutations with random choice between Insert Node and Attributes Change per message.',
    6,
    { mutateAfter: 1, mutateRandomly: true, mixedMode: true }
);