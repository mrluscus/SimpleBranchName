function showError(container, errorMessage) {
  container.classList.add("error");
  var msgElem = document.createElement("span");
  msgElem.classList.add("error-message");
  msgElem.innerHTML = errorMessage;
  container.appendChild(msgElem);
}

function resetError(container) {
  if (container.classList.contains("error")) {
    container.removeChild(container.lastChild);
    container.classList.remove("error");
  }
}

function convertName(form) {
  var elems = form.elements;
  var result = document.getElementById("result");
  var isError = false;

  resetError(elems.tasknumber.parentNode);
  if (!elems.tasknumber.value) {
    showError(elems.tasknumber.parentNode, "Set the task number");
    isError = true;
  }

  resetError(elems.taskname.parentNode);
  if (!elems.taskname.value) {
    showError(elems.taskname.parentNode, "Set the task name");
    isError = true;
  }

  if (!isError) {
    var taskType = elems.tasktype.value;
    var taskTypeName = taskType !== "" ? `${taskType}-` : "";
    var taskNumber = elems.tasknumber.value.trim();
    var taskName = elems.taskname.value
      .trim()
      .replace(/\./g, "-")
      .replace(/\,/g, "-")
      .replace(/\(/g, "-")
      .replace(/\)/g, "-")
      .replace(/\=/g, "-")
      .replace(/\+/g, "-")
      .replace(/\</g, "-")
      .replace(/\>/g, "-")
      .replace(/\[/g, "-")
      .replace(/\]/g, "-")
      .replace(/\s*-/g, "-")
      .replace(/-\s*/g, "-")
      .replace(/\s+/g, "-")
      .replace(/\-\-/g, "-")
      .toLowerCase();

    if (taskName[taskName.length - 1] === "-") {
      taskName = taskName.slice(0, taskName.length - 1);
    }

    result.value = `${taskTypeName}${taskNumber}-${taskName}`.replace(
      /\-\-/g,
      "-"
    );
  }
}

function copyToClipboard() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("copy");
}

function clearAll() {
  var taskNumber = document.getElementById("tasknumber");
  var taskName = document.getElementById("taskname");
  var result = document.getElementById("result");

  taskNumber.value = taskName.value = result.value = "";
}
