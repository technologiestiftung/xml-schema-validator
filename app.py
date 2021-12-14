from flask import Flask, render_template, request, Response
from utils.xml_validator import validation
import json

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api", methods=['GET', 'POST'])
def api():
    if request.method == 'GET':
        return 'GET'
    elif request.method == 'POST':
        xml = request.form['txt']
        while xml.split('\n', 1)[0] == '\r':
            xml = xml.split('\n', 1)[-1]
        try:
            schema_name = request.form['schemas']
            message = validation(schema_name, xml)
        except:
            message = {"status": "error",
                       "message": 'Keine Datei zum Validieren oder ungültige Datei. Laden Sie entweder eine Datei hoch oder kopieren Sie die GML-Datei in das Textfeld.'}
        payload = json.dumps(message)
        return Response(payload, status=201, mimetype='application/json')


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=3333)
