function showError(container, errorMessage) {
    container.classList.add('error');
    var msgElem = document.createElement('span');
    msgElem.classList.add("error-message");
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}

function resetError(container) {
    if (container.classList.contains('error')) {
        container.removeChild(container.lastChild)
        container.classList.remove('error');
    }
}

function convertName(form) {
    var elems = form.elements;
    var result = document.getElementById("result");
    var isError = false;

    resetError(elems.tasknumber.parentNode)
    if (!elems.tasknumber.value) {
        showError(elems.tasknumber.parentNode, 'Set the task number');
        isError = true;
    }

    resetError(elems.taskname.parentNode)
    if (!elems.taskname.value) {
        showError(elems.taskname.parentNode, 'Set the task name');
        isError = true;
    }

    if (!isError) {
        var taskType = elems.tasktype.value;
        var taskNumber = elems.tasknumber.value;
        var taskName = elems.taskname.value.replace(/\s*-/g, '-').replace(/-\s*/g, '-').replace(/\s+/g, '-').toLowerCase();
        result.value = `${taskType}-${taskNumber}-${taskName}`;
    }
}

function copyToClipboard(){
    var copyText = document.getElementById("result");
    copyText.select();
    document.execCommand("copy");
}

