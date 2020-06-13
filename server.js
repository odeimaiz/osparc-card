// node server.js
// http://localhost:8080/card?title=Welcome&description=To%20oSPARC

const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const svgTools = require('@iconify/tools');

const sendCustomCard = (res, title, description, thumbnail) => {
  const card_path = "C:/Develop/oSPARC_card/public/osparc_card.svg";
  const new_card_path = "C:/Develop/oSPARC_card/public/osparc_card_custom.svg";
  svgTools.ImportSVG(card_path)
    .then(svg => {
      let newSVG = svg.toString();
      const defTitle = "Study_Title";
      const defDescription = "Study_Description";
      const defThumbnail = "https://osparc.io/osparc/../resource/osparc/osparc-white.svg";
      newSVG = newSVG.replace(defTitle, title || defTitle);
      newSVG = newSVG.replace(defDescription, description || defDescription);
      newSVG = newSVG.replace(defThumbnail, thumbnail || defThumbnail);
      svgTools.ExportSVG(newSVG, new_card_path)
        .then(() => {
          res.sendFile(new_card_path);
        })
        .catch(err => {
          console.error(err);
        });
    }).catch(err => {
      console.error(err);
    });
};

app.get('/card', (req, res) => {
  // const url = "https://raw.githubusercontent.com/pcrespov/osparc-sample-studies/master/Sleepers%20A%20lot/project.json";
  const url = req.query.studyUrl;
  const reqStudy = https.get(url, (resProject) => {
    let data = '';
    resProject.on('data', (stream) => {
      data += stream;
    });
    resProject.on('end', () => {
      const json_data = JSON.parse(data);
      const title = json_data["name"];
      console.log("title", title);
      const description = json_data["description"];
      const thumbnail = json_data["thumbnail"];
      sendCustomCard(res, title, description, thumbnail);
    });
  });

  reqStudy.on('error', (e) => {
    console.err('reqProject', e.message);
  });
});

const server = app.listen(8080);
