import raceTime from '../utils/raceTime.js';
import records from "#root/db/records";

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const attrs = {
  frameName: 'mapRecordsWidget',
  hiddenPos: '15 0',
  closedIcon: '🏆',
};

const getRecordLine = (user,time,height)=>{
  return `
        <label pos="155 ${height}" textsize="1.2" textcolor="${'FFFFFF'}" text="${user} - ${raceTime(time)}" z-index="2" textfont="RajdhaniMono" halign="right" valign="top"/>
    `
}

const getRecordList = (recordList) => {
  let height = 60;

  if (!recordList.length || recordList.length === 0) {
    return `
      <quad size="28 9" halign="right" pos="160 45" bgcolor="000000" opacity="0.6" valign="top"/>

      <label pos="155 42" textsize="1.2" textcolor="FFFFFF" text="No records yet" z-index="2" textfont="RajdhaniMono" halign="right" valign="top"/>
    `;
  }

  const displayList = recordList.reduce((accum, record) => {
    const line = getRecordLine(record.name, recordList.time, height)
    height -= 4;
  }, '')

  const bg = `
    <quad size="28 ${4.7 * cps.length}" halign="right" pos="160 45" bgcolor="000000" opacity="0.6" valign="top"/>
  `;
  return `${displayList}${bg}`
}

const template = async (client) => {
  const { UId } = await client.call('GetCurrentMapInfo');
  const recordList = (await records.getRecordListOnMap(UId)).slice(0,10);

  return `
    <frame id="${attrs.frameName}">
      <label id="${attrs.frameName}arrow" class="trigger${attrs.frameName} text-light" pos="125.5 65" size="5 5" text="❌" textfont="RajdhaniMono" textsize="1" ScriptEvents="1" halign="center" valign="center" />
      ${getRecordList(recordList)}
    </frame>
  `;
};

export default {
  template,
  attrs,
};
