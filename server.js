const express = require('express');
const app = express();
const fs = require('fs');
const svgTools = require('@iconify/tools');

app.get('/card', (req, res) => {
  https://raw.githubusercontent.com/pcrespov/osparc-sample-studies/master/Sleepers%20A%20lot/project.json

  const title = req.query.title;
  console.log("title", title);
  const description = req.query.description;
  const thumbnail = req.query.thumbnail;
  const card_path = "C:/Develop/oSPARC_card/public/osparc_card.svg";
  const new_card_path = "C:/Develop/oSPARC_card/public/osparc_new_card.svg";
  svgTools.ImportSVG(card_path)
    .then(svg => {
      let newSVG = svg.toString();
      newSVG = newSVG.replace("Study_Title", title);
      newSVG = newSVG.replace("Study_Description", description);
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
});

const server = app.listen(8080);
