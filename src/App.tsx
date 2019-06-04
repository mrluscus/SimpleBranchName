import React, { useRef, useState } from "react";

const App: React.FC = () => {
  const taskTypes = [
    { id: "nfp", value: "NFP" },
    { id: "sn", value: "SN" },
    { id: "feature", value: "Feature" },
    { id: "issue", value: "Issue" },
    { id: "none", value: "None" }
  ];

  const prefixes = [
    { id: "none", value: "None" },
    { id: "backend", value: "backend" },
    { id: "frontend", value: "frontend" }
  ];

  const [taskType, setTaskType] = useState(taskTypes[0].id);
  const [prefix, setPrefix] = useState(prefixes[0].id);
  const [taskNumber, setTaskNumber] = useState("");
  const [taskName, setTaskName] = useState("");
  const [result, setResult] = useState("");
  const copyAreaRef = useRef<any | null>(null);

  function handleSubmit(event: any) {
    event.preventDefault();

    var taskTypeName =
      taskType !== "" && taskType !== "none" ? `${taskType}-` : "";
    var prefixName = prefix != "" && prefix !== "none" ? `${prefix}/` : "";

    var taskNameConverted = taskName
      .trim()
      .replace(/\./g, "-")
      .replace(/,/g, "-")
      .replace(/\(/g, "-")
      .replace(/\)/g, "-")
      .replace(/=/g, "-")
      .replace(/\+/g, "-")
      .replace(/</g, "-")
      .replace(/>/g, "-")
      .replace(/\[/g, "-")
      .replace(/\]/g, "-")
      .replace(/\s*-/g, "-")
      .replace(/-\s*/g, "-")
      .replace(/\s+/g, "-")
      .replace(/--/g, "-")
      .toLowerCase();

    if (taskNameConverted[taskNameConverted.length - 1] === "-") {
      taskNameConverted = taskNameConverted.slice(
        0,
        taskNameConverted.length - 1
      );
    }

    const resultValue = `${prefixName}${taskTypeName}${taskNumber.trim()}-${taskNameConverted}`.replace(
      /--/g,
      "-"
    );
    setResult(resultValue);
  }

  function copyToClipboard(event: any) {
    event.preventDefault();
    if (copyAreaRef.current) copyAreaRef.current.select();
    document.execCommand("copy");
  }

  function onChangeText(e: any) {
    setTaskNumber(e.target.value);
  }

  function clearAll() {
    setTaskName("");
    setTaskNumber("");
    setResult("");
  }

  return (
    <div>
      <fieldset>
        <legend>Task details:</legend>

        <form onSubmit={handleSubmit}>
          <div className="task">
            <label>
              Type of the task
              <select
                className="select-type"
                value={taskType}
                onChange={e => setTaskType(e.target.value)}
              >
                {taskTypes.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div className="task">
            <label>
              Prefix
              <select
                className="select-type"
                value={prefix}
                onChange={e => setPrefix(e.target.value)}
              >
                {prefixes.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div className="task">
            <label>
              Task number:
              <input
                type="text"
                value={taskNumber}
                onChange={onChangeText}
                placeholder="Number of the task to wrap it"
                required
              />
            </label>
          </div>

          <div className="task">
            <label>
              Task name:
              <input
                type="text"
                id="taskname"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                placeholder="Name of the task to wrap it"
                required
              />
            </label>
          </div>

          <div>
            <input type="submit" value="Convert the name" />
            <button onClick={clearAll}>Clear</button>
          </div>
        </form>
      </fieldset>

      <br />

      <fieldset>
        <legend>Result:</legend>
        <div>
          <textarea
            ref={copyAreaRef}
            value={result}
            onChange={e => setResult(e.target.value)}
            className="result"
          />
        </div>
        <div>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      </fieldset>
    </div>
  );
};

export default App;
