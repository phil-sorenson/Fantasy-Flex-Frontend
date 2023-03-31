import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Table} from 'react-bootstrap';

const ScoringSettings = ({ scoring_settings }) => {
  
  const defaultScoringSettings = {
    // Note: These are the default Scoring Settings per Sleeper (Only settings w/ a # value listed)
    // Passing:
    pass_yd: 0.04||0.03999999910593033,
      // 1 per 25 yards
    pass_td: 4,
    pass_2pt: 2,
    pass_int: -1,
    // Rushing:
    rush_yd: 0.10000000149011612||0.10||0.1,
      // 1 per 10 yards
    rush_td: 6,
    rush_2pt: 2,
    // Receiving:
    rec: 1, // 1+ = PPR, 0.5 = Half-PPR
    rec_yd: 0.10000000149011612||0.10||0.1,
      // 1 per 10 yards
    rec_td: 6,
    rec_2pt: 2,
    // Misc:
    fum: 0,
    fum_lost: -2,
    fum_rec_td: 6,
    // Defense & Special Team Defense:
    def_td: 6,
    sack: 1,
    ff: 1,
    fum_rec: 2,
    int: 2,
    safe: 2,
    blk_kick: 2,
    pts_allow_0: 10,
    pts_allow_1_6: 7,
    pts_allow_7_13: 4,
    pts_allow_14_20: 1,
    pts_allow_21_27: 0,
    pts_allow_28_34: -1,
    pts_allow_35p: -4,
    def_st_ff: 1,
    def_st_td: 6,
    def_st_fr: 1,
    // Special Team Player:
    st_td: 6,
    st_ff: 1,
    st_fum_rec: 1,
    // Kicking:
    fgm_0_19: 3,
    fgm_20_29: 3,
    fgm_30_39: 3,
    fgm_40_49: 4,
    fgm_50p: 5,
    xpm: 1,
    fgmiss: -1,
    xpmiss: -1,
  };

  // FixMe: Certain scoring settings are still being highlighted despite matching the specific values --> pass_td : 4, rec: 1, etc...
    // Note: In some leagues they are highlighted & some leagues they are not...Identify why that might be
  // FixMe: Clean up how the 'key(s)' look within the Scoring Settings (As of right now they render out exactly how they would look from an API request(e.g. rush_2pt: 2 ))
  
  const setScoringSettings = [
    // Note: These are the Scoring Settings I want to show on every league by default
    'pass_yd',
    'pass_td',
    'pass_2pt',
    'pass_int',
    'rec',
    'rec_yd',
    'rec_td',
    'rec_2pt',
    'rush_yd',
    'rush_td',
    'rush_2pt'
  ]

  const getCategoryFromPrefix = (key) => {
    if (key.startsWith('pass')|| key.startsWith('bonus_pass')) {
      return "Passing";
    } else if (key.startsWith('rush')|| key.startsWith('bonus_rush')) {
      return "Rushing";
    } else if (key.startsWith('rec')|| key.startsWith('bonus_rec')) {
      return "Receiving";
    } else if (key.startsWith('pts_allow')||key.startsWith('def')||key.startsWith('sack')||
      key.startsWith('ff')||key.startsWith('fum_rec')||key.startsWith('int')||key.startsWith('safe')||key.startsWith('blk')) {
      return "Team Defense";
    } else if (key.startsWith('idp')) {
      return "IDP";
    } else if (key.startsWith('fum')) {
      return "Misc.";
    } else if (key.startsWith('def_st')||key.startsWith('st')) {
      return "Special Teams";
    } else if (key.startsWith('fgm')||key.startsWith('xpm')) {
      return "Kicking";
    } 
    return 'Unknown';
  };


  const isNonStandard = (key, value) => {
    return defaultScoringSettings[key] !== value;
  }

  // Future => Group the scoring settings by category
  // const groupScoringSettings = () => {
  //   const groupedSettings = {};

  //   for (const key of setScoringSettings) {
  //     const category = getCategoryFromPrefix(key);
  //     if (!groupedSettings[category]) {
  //       groupedSettings[category] = [];
  //     }
  //     groupedSettings[category].push(key);
  //   }
  //   for (const [key, value] of Object.entries(scoring_settings)) {
  //     if (isNonStandard(key, value)) {
  //       const category = getCategoryFromPrefix(key);
  //       if (!groupedSettings[category]) {
  //         groupedSettings[category] = []; 
  //       }
  //       groupedSettings[category].push(key);
  //     }
  //   }
  //   return groupedSettings;
  // };


  const renderScoringSettings = () => {
        // CodeLogic => function: combines the 'setScoringSettings' w/ the non-standard scoring settings that differ from the default values --> This function will create a new Set to store the combined   list of keys, ensuring no duplicates --> maps over the 'keys' to render each scoring setting.
    // const groupedSettings = groupScoringSettings
    const settingsToRender = new Set([...setScoringSettings]);
    const nonStandardSettings = [];

    for (const [key,value] of Object.entries(scoring_settings)) {
      if (isNonStandard(key, value)) {
        settingsToRender.add(key);
          // CodeLogic => .add(key): appends a new element w/ a specific value to the end of the Set
        nonStandardSettings.push(key);
          // CodeLogic => .push(key): appends new elements to the end of an array, & returns the new length of an array
      }
    }
    return Array.from(settingsToRender).map((key) => {
        // CodeLogic => Array.from(settingsToRender): creates an Array from an iterable object
      const value = scoring_settings[key];
      const category = getCategoryFromPrefix(key);
      const isHighLighted = nonStandardSettings.includes(key);

      return(
        <ListGroup.Item key={key} style={{backgroundColor: isHighLighted ? '#fffacd' : 'none'}}>
          {`${category} - ${key}: ${value}`}
        </ListGroup.Item>
      );
    });
  };

  return(
    <div>
      <Card>
        <Card.Header>
          <h2>Scoring Settings</h2>
          <h6>Any non-standard scoring settings are highlighted in yellow</h6>
        </Card.Header>
        <ListGroup variant='flush'>{renderScoringSettings()}</ListGroup>
      </Card>
    </div>
  )

}
export default ScoringSettings;

// Note: Default Sleeper Scoring Settings
// Note: 
// Passing:
// Passing Yards
// +1 point every
// 25
// yards
// (0.04 per yard)
// Passing TD
// +4
// 2-Pt Conversion
// +2
// Pass Intercepted
// -1

// Rushing:
// Rushing Yards
// +1 point every
// 10
// yards
// (0.10 per yard)
// Rushing TD
// +6
// 2-Pt Conversion
// +2

// Receiving:
// Reception
// +1
// Receiving Yards
// +1 point every
// 10
// yards
// (0.10 per yard)
// Receiving TD
// +6
// 2-Pt Conversion
// +2

// Misc.:
// Fumble
// 0
// Fumble Lost
// -2
// Fumble Recovery TD
// +6

// Defense:
// Defense TD
// +6
// Points Allowed 0
// +10
// Points Allowed 1-6
// +7
// Points Allowed 7-13
// +4
// Points Allowed 14-20
// +1
// Points Allowed 21-27
// 0
// Points Allowed 28-34
// -1
// Points Allowed 35+
// -4
// Sacks
// +1
// Interceptions
// +2
// Fumble Recovery
// +2
// Safety
// +2
// Forced Fumble
// +1
// Blocked Kick
// +2

// Special Teams Defense:
// Special Teams TD
// +6
// Special Teams Forced Fumble
// +1
// Special Teams Fumble Recovery
// +1

// Kicking:
// FG Made (0-19 yards)
// +3
// FG Made (20-29 yards)
// +3
// FG Made (30-39 yards)
// +3
// FG Made (40-49 yards)
// +4
// FG Made (50+ yards)
// +5
// PAT Made
// +1
// FG Missed
// -1
// PAT Missed
// -1

