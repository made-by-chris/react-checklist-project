import { useState } from "react";
import "./App.css";
import topicsData from "./topics.json";

const localStorageChecklistValues = localStorage.getItem("checklist-values");
let initialCheckListValues;
if (localStorageChecklistValues !== null) {
  try {
    initialCheckListValues = JSON.parse(localStorageChecklistValues);
  } catch (e) {
    console.log("could not load saved checkbox values, wasnt valid JSON");
  }
}
const enrichedData = topicsData.map((topic) => ({
  ...topic,
  checked:
    initialCheckListValues !== undefined
      ? initialCheckListValues[topic.concept]
      : false,
}));

function App() {
  const [topics, setTopics] = useState(enrichedData);

  function handleClickCheckbox(index) {
    const updatedTopics = [...topics];
    updatedTopics[index].checked = !updatedTopics[index].checked;
    setTopics(updatedTopics);

    const checklistValuesData = {};
    updatedTopics.forEach((topic) => {
      checklistValuesData[topic.concept] = topic.checked;
    });

    localStorage.setItem(
      "checklist-values",
      JSON.stringify(checklistValuesData)
    );
  }

  return (
    <>
      <h1>react checklist project</h1>
      <ul>
        {topics.map((topic, index) => (
          <div key={topic.concept}>
            <input
              type="checkbox"
              onChange={() => handleClickCheckbox(index)}
              checked={topic.checked}
            />
            <h4>
              {index} {topic.concept}
            </h4>
            <h5>description:</h5>
            <p>{topic.description}</p>
            <p>
              <a href={topic.officialResource}>link</a>
            </p>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
