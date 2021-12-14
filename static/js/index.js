// @ts-check
document.addEventListener("DOMContentLoaded", function () {
  let fileContent = undefined;
  const target = document.querySelector("#results");
  if (!target) {
    throw new Error("Could not find target div (#results) for results");
  }

  const resframe = document.querySelector("iframe#result-iframe");
  if (resframe) {
    if (resframe instanceof HTMLElement) {
      resframe.style.display = "none";
    }
  }

  const form = document.querySelector("#form");
  if (!form) {
    throw new Error("Could not find form element (#form)");
  }

  const textArea = document.querySelector("textarea#txt");
  if (!textArea) {
    throw new Error("Could not find textarea#txt");
  }
  const fileUpload = document.querySelector("input#xml");
  if (!fileUpload) {
    throw new Error("Could not find file input element");
  }

  fileUpload.addEventListener(
    "change",
    function () {
      const fileList = this.files;
      const firstFile = fileList[0];
      // TODO: Can we validate that the file is an gml file?
      // below is just the solution for an xml file
      // if (firstFile.type !== "application/xml") {
      //   throw new Error("This is not an xml");
      // }
      const reader = new FileReader();
      reader.readAsText(firstFile, "UTF-8");
      reader.onerror = () => {
        throw new Error("could not read file");
      };
      reader.onload = (e) => {
        const xml = e.target.result;
        fileContent = xml;
        // @ts-ignore
        textArea.value = fileContent;
        // @ts-ignore
        // we could empty the file list here, but it would
        // create confusion for the user i guess
        // fileUpload.value = "";
      };
    },
    false
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      // uf we have something in txt entry we don't need to
      // send the file over
      if (formData.get("txt") !== undefined) {
        formData.delete("xml"); // that's why we remove it
        // below while loop is just for verification that the
        // selected file is actually gone
        const it = formData.keys();
        let result = it.next();
        // formData.set("txt", fileContent);
        while (!result.done) {
          // console.log(result.value);
          result = it.next();
        }
      }
      fetch(form.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            // throw error
            // give warning
            // do something
            return;
          }
          //form.reset();
          return response.json();
        })
        .then((json) => {
          console.log(json);
          if (target instanceof HTMLElement) {
            target.innerHTML = "";
            // const br = document.createElement("br");
            const h3 = document.createElement("h3");
            const report_status = document.createElement("p");
            report_status.classList.add("bold", "report-title");
            h3.classList.add("bold", "report-title", "headline-03");
            for (var key in json) {
              if (json.hasOwnProperty(key)) {
                if (key === "status") {
                  switch (json[key]) {
                    case "invalid": {
                      h3.textContent = "Ergebnis: Die GML Datei ist nicht valide";
                      report_status.textContent = "Sie entspricht nicht dem vorgegebenen Schema.";
                      console.log("invalid");
                      break;
                    }
                    case "valid": {
                      h3.textContent = "Ergebnis: Die Validierung war erfolgreich";
                      report_status.textContent = "Die GML-Datei entspricht dem vorgegebenen Schema. Es wurden keine Fehler gefunden. Gut gemacht.";
                      console.log("valid");

                      break;
                    }
                    case "error": {
                      h3.textContent =
                        "Fehler: Keine Datei zum Validieren oder ungültige Datei";
                      report_status.textContent = "Laden Sie entweder eine Datei hoch oder kopieren Sie die GML-Datei in das Textfeld.";
                      console.log("error");

                      break;
                    }
                  }
                  target.appendChild(h3);
                  target.appendChild(report_status);
                } else if (key === "report") {
                  const reportKeys = Object.keys(json.report);
                  for (const reportKey of reportKeys) {
                    const report = json.report[reportKey];
                    const reportTitle = document.createElement("h4");
                    reportTitle.classList.add("bold", "report-title");
                    reportTitle.textContent = `Fehler in Zeile ${reportKey}`;
                    const p = document.createElement("p");
                    p.classList.add("report-text", "headline-04");
                    // const span2 = document.createElement("span");
                    // span2.classList.add("headline-04");
                    p.textContent = report;

                    target.appendChild(reportTitle);
                    // p.appendChild(span2);
                    target.appendChild(p);
                  }
                }
              }
            }
          }
        })
        .catch(console.error);
    }
  });
});
