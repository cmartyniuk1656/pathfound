var selectedCharaterIndex;    
var selectedEditableIndex;
var activeChar = {};
var editableChar = {};
var editStatValueArray = [];
var activeStatValueArray = [];

var FormFieldArray = ['#sheet-name','#sheet-race', '#sheet-class', '#sheet-age', '#sheet-gender', '#sheet-size', '#sheet-alignment', 
                      '#sheet-deity', '#sheet-current-hp', '#sheet-strscore', '#sheet-dexscore', '#sheet-conscore', '#sheet-intscore',
                      '#sheet-wisscore', '#sheet-chascore', '#sheet-temp-strscore', '#sheet-temp-dexscore', '#sheet-temp-conscore', 
                      '#sheet-temp-intscore', '#sheet-temp-wisscore', '#sheet-temp-chascore', '#sheet-initiative-misc', '#sheet-speed-base', 
                      '#sheet-speed-mod', '#sheet-hp-max'];
            
var statElementArray = ['#character-name-show', '#stats-race', '#stats-class', '#stats-age', '#stats-gender', '#stats-size', 
                        '#stats-alignment', '#stats-deity', '#stats-current-hp', '#stats-strscore', '#stats-dexscore', '#stats-conscore', 
                        '#stats-intscore', '#stats-wisscore', '#stats-chascore', '#stats-temp-strscore', '#stats-temp-dexscore', 
                        '#stats-temp-conscore', '#stats-temp-intscore', '#stats-temp-wisscore', '#stats-temp-chascore', 
                        '#stats-initiative-misc', '#stats-speed-base', '#stats-speed-mod', '#stats-hp-max'];

var initStatValueArray = function(character, type) {
    
    var valueArray = [];
    
    if (character != null && typeof(character != 'undefined')) {
        
        valueArray = [character.Name, character.Race, character.Class, character.Age, character.Gender, character.Size, character.Alignment, 
                      character.Deity, character.CurrentHP, character.Str, character.Dex, character.Con, character.Int, character.Wis, 
                      character.Cha, character.TempStr, character.TempDex, character.TempCon, character.TempInt, character.TempWis, 
                      character.TempCha, character.InitiativeMisc, character.BaseSpeed, character.ModSpeed, character.MaxHP];
        
    }
    
    if (type == 'active') {
        activeStatValueArray = valueArray;
    }
    
    else if (type == 'editable'){
        editStatValueArray = valueArray;
    }
    
    else if (type == 'blank') {
        //do something
    }
    
}


var CharacterObj =
{
    //Parameters
    "Name": "",
    "Race": "",
    "Size": "",
    "Class": "",
    "Gender": "",
    "Age": 0,
    "Alignment": "",
    "Deity": "",
    "Str": 0,
    "TempStr": 0,
    "Dex": 0,
    "TempDex": 0,
    "Con": 0,
    "TempCon": 0,
    "Int": 0,
    "TempInt": 0,
    "Wis": 0,
    "TempWis": 0,
    "Cha": 0,
    "TempCha": 0,
    "MaxHP": 0,
    "CurrentHP": 0,
    "DR": "",
    "BaseSpeed": "",
    "ModSpeed": "",
    "InitiativeMisc": 0,
    "ACNat": 0,
    "ACDeflect": 0,
    "ACMisc": 0,
    "FortBase": 0,
    "FortMagic": 0,
    "FortMisc": 0,
    "FortTemp": 0,
    "RefBase": 0,
    "RefMagic": 0,
    "RefMisc": 0,
    "RefTemp": 0,
    "WillBase": 0,
    "WillMagic": 0,
    "WillMisc": 0,
    "WillTemp": 0,
    "BAB": 0,
    "SR": 0,
    "CMBMisc": 0,
    "CMDMisc": 0,
    "Skills":
        {
            "AcroCS": false,
            "AcroAbil": 0,
            "AcroRank": 0,
            "AcroMisc": 0,
            "ApprCS": false,
            "ApprAbil": 0,
            "ApprRank": 0,
            "ApprMisc": 0,
            "BlufCS": false,
            "BlufAbil": 0,
            "BlufRank": 0,
            "BlufMisc": 0,
            "ClimCS": false,
            "ClimAbil": 0,
            "ClimRank": 0,
            "ClimMisc": 0,
            "Craf1CS": false,
            "Craf1Abil": 0,
            "Craf1Rank": 0,
            "Craf1Misc": 0,
            "Craf2CS": false,
            "Craf2Abil": 0,
            "Craf2Rank": 0,
            "Craf2Misc": 0,
            "Craf3CS": false,
            "Craf3Abil": 0,
            "Craf3Rank": 0,
            "Craf3Misc": 0,
            "DiplCS": false,
            "DiplAbil": 0,
            "DiplRank": 0,
            "DiplMisc": 0,
            "DisaCS": false,
            "DisaAbil": 0,
            "DisaRank": 0,
            "DisaMisc": 0,
            "DisgCS": false,
            "DisgAbil": 0,
            "DisgRank": 0,
            "DisgMisc": 0,
            "EscaCS": false,
            "EscaAbil": 0,
            "EscaRank": 0,
            "EscaMisc": 0,
            "FlyCS": false,
            "FlyAbil": 0,
            "FlyRank": 0,
            "FlyMisc": 0,
            "HandCS": false,
            "HandAbil": 0,
            "HandRank": 0,
            "HandMisc": 0,
            "HealCS": false,
            "HealAbil": 0,
            "HealRank": 0,
            "HealMisc": 0,
            "IntiCS": false,
            "IntiAbil": 0,
            "IntiRank": 0,
            "IntiMisc": 0,
            "ArcaCS": false,
            "ArcaAbil": 0,
            "ArcaRank": 0,
            "ArcaMisc": 0,
            "DungCS": false,
            "DungAbil": 0,
            "DungRank": 0,
            "DungMisc": 0,
            "EngiCS": false,
            "EngiAbil": 0,
            "EngiRank": 0,
            "EngiMisc": 0,
            "GeogCS": false,
            "GeogAbil": 0,
            "GeogRank": 0,
            "GeogMisc": 0,
            "HistCS": false,
            "HistAbil": 0,
            "HistRank": 0,
            "HistMisc": 0,
            "LocaCS": false,
            "LocaAbil": 0,
            "LocaRank": 0,
            "LocaMisc": 0,
            "NatuCS": false,
            "NatuAbil": 0,
            "NatuRank": 0,
            "NatuMisc": 0,
            "NobiCS": false,
            "NobiAbil": 0,
            "NobiRank": 0,
            "NobiMisc": 0,
            "PlanCS": false,
            "PlanAbil": 0,
            "PlanRank": 0,
            "PlanMisc": 0,
            "ReliCS": false,
            "ReliAbil": 0,
            "ReliRank": 0,
            "ReliMisc": 0,
            "LingCS": false,
            "LingAbil": 0,
            "LingRank": 0,
            "LingMisc": 0,
            "PercCS": false,
            "PercAbil": 0,
            "PercRank": 0,
            "PercMisc": 0,
            "Perf1CS": false,
            "Perf1Abil": 0,
            "Perf1Rank": 0,
            "Perf1Misc": 0,
            "Perf2CS": false,
            "Perf2Abil": 0,
            "Perf2Rank": 0,
            "Perf2Misc": 0,
            "Prof1CS": false,
            "Prof1Abil": 0,
            "Prof1Rank": 0,
            "Prof1Misc": 0,
            "Prof2CS": false,
            "Prof2Abil": 0,
            "Prof2Rank": 0,
            "Prof2Misc": 0,
            "RideCS": false,
            "RideAbil": 0,
            "RideRank": 0,
            "RideMisc": 0,
            "SensCS": false,
            "SensAbil": 0,
            "SensRank": 0,
            "SensMisc": 0,
            "SleiCS": false,
            "SleiAbil": 0,
            "SleiRank": 0,
            "SleiMisc": 0,
            "SpelCS": false,
            "SpelAbil": 0,
            "SpelRank": 0,
            "SpelMisc": 0,
            "SteaCS": false,
            "SteaAbil": 0,
            "SteaRank": 0,
            "SteaMisc": 0,
            "SurvCS": false,
            "SurvAbil": 0,
            "SurvRank": 0,
            "SurvMisc": 0,
            "SwimCS": false,
            "SwimAbil": 0,
            "SwimRank": 0,
            "SwimMisc": 0,
            "UmdCS": false,
            "UmdAbil": 0,
            "UmdRank": 0,
            "UmdMisc": 0,
            "Misc1CS": false,
            "Misc1Abil": 0,
            "Misc1Rank": 0,
            "Misc1Misc": 0,
            "Misc2CS": false,
            "Misc2Abil": 0,
            "Misc2Rank": 0,
            "Misc2Misc": 0,
            "Misc3CS": false,
            "Misc3Abil": 0,
            "Misc3Rank": 0,
            "Misc3Misc": 0,
            "Misc4CS": false,
            "Misc4Abil": 0,
            "Misc4Rank": 0,
            "Misc4Misc": 0,
            "Misc5CS": false,
            "Misc5Abil": 0,
            "Misc5Rank": 0,
            "Misc5Misc": 0
        },
    "Traits":
        {
            "Trait1": "",
            "Trait2": "",
            "Trait3": "",
            "Trait4": "",
            "Trait5": "",
            "Trait6": "",
            "Trait7": "",
            "Trait8": "",
            "Trait9": "",
            "Trait10": "",
            "Trait11": "",
            "Trait12": "",
            "Trait13": "",
            "Trait14": "",
            "Trait15": "",
            "Trait16": "",
            "Trait17": "",
            "Trait18": "",
            "Trait19": "",
            "Trait20": ""
        },
    "ClassFeatures":
        {
            "ClassFeature1": "",
            "ClassFeature2": "",
            "ClassFeature3": "",
            "ClassFeature4": "",
            "ClassFeature5": "",
            "ClassFeature6": "",
            "ClassFeature7": "",
            "ClassFeature8": "",
            "ClassFeature9": "",
            "ClassFeature10": "",
            "ClassFeature11": "",
            "ClassFeature12": "",
            "ClassFeature13": "",
            "ClassFeature14": "",
            "ClassFeature15": "",
            "ClassFeature16": "",
            "ClassFeature17": "",
            "ClassFeature18": "",
            "ClassFeature19": "",
            "ClassFeature20": ""

        },
    "Feats":
        {
            "Feats1": "",
            "Feats2": "",
            "Feats3": "",
            "Feats4": "",
            "Feats5": "",
            "Feats6": "",
            "Feats7": "",
            "Feats8": "",
            "Feats9": "",
            "Feats10": "",
            "Feats11": "",
            "Feats12": "",
            "Feats13": "",
            "Feats14": "",
            "Feats15": "",
            "Feats16": "",
            "Feats17": "",
            "Feats18": "",
            "Feats19": "",
            "Feats20": ""

        },
    "Weapons":
        {
            "Name1": "",
            "Bonus1": 0,
            "CritRange1": 0,
            "CritMulti1": 0,
            "Damage1": "",
            "DamageType1": "",
            "Range1": "",
            "Ammo1": "",
            "Name2": "",
            "Bonus2": 0,
            "CritRange2": 0,
            "CritMulti2": 0,
            "Damage2": "",
            "DamageType2": "",
            "Range2": "",
            "Ammo2": "",
            "Name3": "",
            "Bonus3": 0,
            "CritRange3": 0,
            "CritMulti3": 0,
            "Damage3": "",
            "DamageType3": "",
            "Range3": "",
            "Ammo3": "",
            "Name4": "",
            "Bonus4": 0,
            "CritRange4": 0,
            "CritMulti4": 0,
            "Damage4": "",
            "DamageType4": "",
            "Range4": "",
            "Ammo4": ""
        },
    "Armour":
        {
            "Name": "",
            "Bonus": "",
            "MaxDex": "",
            "Type": "",
            "CheckPenalty": "",
            "SpellFailure": "",
            "Weight": "",
            "Properties": ""
        },
    "Shield":
        {
            "Name": "",
            "Bonus": "",
            "MaxDex": "",
            "Type": "",
            "CheckPenalty": "",
            "SpellFailure": "",
            "Weight": "",
            "Properties": ""
        },
    "MagicBelt": "",
    "MagicBeltDesc": "",
    "MagicBody": "",
    "MagicBodyDesc": "",
    "MagicChest": "",
    "MagicChestDesc": "",
    "MagicEyes": "",
    "MagicEyesDesc": "",
    "MagicFeet": "",
    "MagicFeetDesc": "",
    "MagicHand": "",
    "MagicHandDesc": "",
    "MagicHeadband": "",
    "MagicHeadbandDesc": "",
    "MagicNeck": "",
    "MagicNeckDesc": "",
    "MagicShoulders": "",
    "MagicShouldersDesc": "",
    "MagicWrist": "",
    "MagicWristDesc": "",
    "Ring1": "",
    "Ring1Desc": "",
    "Ring2": "",
    "Ring2Desc": "",
    "Inventory":
        {
            "Name1": "",
            "Qty1": "",
            "Weight1": "",
            "Value1": "",
            "Name2": "",
            "Qty2": "",
            "Weight2": "",
            "Value2": "",
            "Name3": "",
            "Qty3": "",
            "Weight3": "",
            "Value3": "",
            "Name4": "",
            "Qty4": "",
            "Weight4": "",
            "Value4": "",
            "Name5": "",
            "Qty6": "",
            "Weight6": "",
            "Value6": "",
            "Name6": "",
            "Qty7": "",
            "Weight7": "",
            "Value7": "",
            "Name7": "",
            "Qty8": "",
            "Weight8": "",
            "Value8": "",
            "Name9": "",
            "Qty9": "",
            "Weight9": "",
            "Value9": "",
            "Name10": "",
            "Qty10": "",
            "Weight10": "",
            "Value10": "",
            "Name11": "",
            "Qty11": "",
            "Weight11": "",
            "Value11": "",
            "Name12": "",
            "Qty12": "",
            "Weight12": "",
            "Value12": "",
            "Name13": "",
            "Qty13": "",
            "Weight13": "",
            "Value13": "",
            "Name14": "",
            "Qty14": "",
            "Weight14": "",
            "Value14": "",
            "Name15": "",
            "Qty15": "",
            "Weight15": "",
            "Value15": "",
            "Name16": "",
            "Qty16": "",
            "Weight16": "",
            "Value16": "",
            "Name17": "",
            "Qty17": "",
            "Weight17": "",
            "Value17": "",
            "Name18": "",
            "Qty18": "",
            "Weight18": "",
            "Value18": "",
            "Name19": "",
            "Qty19": "",
            "Weight19": "",
            "Value19": "",
            "Name20": "",
            "Qty20": "",
            "Weight20": "",
            "Value20": "",
            "Name21": "",
            "Qty21": "",
            "Weight21": "",
            "Value21": "",
            "Name22": "",
            "Qty22": "",
            "Weight22": "",
            "Value22": "",
            "Name23": "",
            "Qty23": "",
            "Weight23": "",
            "Value23": "",
            "Name24": "",
            "Qty24": "",
            "Weight24": "",
            "Value24": "",
            "Name25": "",
            "Qty25": "",
            "Weight25": "",
            "Value25": "",
            "Name26": "",
            "Qty26": "",
            "Weight26": "",
            "Value26": "",
            "Name27": "",
            "Qty27": "",
            "Weight27": "",
            "Value27": "",
            "Name28": "",
            "Qty28": "",
            "Weight28": "",
            "Value28": "",
            "Name29": "",
            "Qty29": "",
            "Weight29": "",
            "Value29": "",
            "Name30": "",
            "Qty30": "",
            "Weight30": "",
            "Value30": "",
        },
    "Currencies": ""
}


var CharacterSheet =
{
    "Events":
    {
        "addAll": function()
        {

            $("#character-sheet-save").click(function() {
                CharacterSheet.Save();
            });
            
            $("#create-character-btn").click(function() {
                
                for (i = 0; i < FormFieldArray.length; i ++) {
                    $(FormFieldArray[i]).val('');
                }
                
            });
                
        }
    },
    
    "Util": {
        saveCharacterToServer: function() {
            IO.saveCharacter(CharacterObj, User.username);
        },
        
        saveCharacterToDatabase: function() {
            IO.db.checkCharExistInDb(User.username, CharacterObj.Name);
        },
        
        initializeStatValueArray() {
            initStatValueArray(activeChar, 'active');
        }
        
    },
    
    "Save": function ()
    {
        CharacterObj.Name = $("#sheet-name").val();
        CharacterObj.Race = $("#sheet-race").val();
        CharacterObj.Size = $("#sheet-size").val();
        CharacterObj.Class = $("#sheet-class").val();
        CharacterObj.Gender = $("#sheet-gender").val();
        CharacterObj.Age = $("#sheet-age").val();
        CharacterObj.Alignment = $("#sheet-alignment").val();
        CharacterObj.Deity = $("#sheet-deity").val();
        CharacterObj.Str = $("#sheet-strscore").val();
        CharacterObj.TempStr = $("#sheet-temp-strscore").val();
        CharacterObj.Dex = $("#sheet-dexscore").val();
        CharacterObj.TempDex = $("#sheet-temp-dexscore").val();
        CharacterObj.Con = $("#sheet-conscore").val();
        CharacterObj.TempCon = $("#sheet-temp-conscore").val();
        CharacterObj.Int = $("#sheet-intscore").val();
        CharacterObj.TempInt = $("#sheet-temp-intscore").val();
        CharacterObj.Wis = $("#sheet-wisscore").val();
        CharacterObj.TempWis = $("#sheet-temp-wisscore").val();
        CharacterObj.Cha = $("#sheet-chascore").val();
        CharacterObj.TempCha = $("#sheet-temp-chascore").val();
        CharacterObj.MaxHP = $("#sheet-hp-max").val();
        CharacterObj.CurrentHP = 1;
        CharacterObj.BaseSpeed = $("#sheet-speed-base").val();
        CharacterObj.ModSpeed = $("#sheet-speed-mod").val();
        CharacterObj.InitiativeMisc = $("#sheet-initiative-misc").val();
        CharacterObj.ACNat =$("#sheet-ac-natural").val();
        CharacterObj.ACDeflect = $("#sheet-ac-deflection").val();
        CharacterObj.ACMisc = $("#sheet-ac-misc").val();
        CharacterObj.FortBase = $("#sheet-fort-base").val();
        CharacterObj.FortMagic = $("#sheet-fort-magic");
        CharacterObj.FortMisc = $("#sheet-fort-misc");
        CharacterObj.FortTemp = $("#sheet-fort-temp");
        CharacterObj.RefBase = $("#sheet-ref-base");
        CharacterObj.RefMagic = $("#sheet-ref-magic");
        CharacterObj.RefMisc = $("#sheet-ref-misc");
        CharacterObj.RefTemp = $("#sheet-ref-temp");
        CharacterObj.WillBase = $("#sheet-will-base");
        CharacterObj.WillMagic = $("#sheet-will-magic");
        CharacterObj.WillMisc = $("#sheet-will-misc");
        CharacterObj.WillTemp = $("#sheet-will-temp");
        CharacterObj.BAB = $("#sheet-bab");
        CharacterObj.SR = $("#sheet-sr");
        CharacterObj.CMBMisc = $("#sheet-cmd-misc");
        CharacterObj.CMDMisc = $("#sheet-cmb-misc");
        CharacterObj.Skills.AcroCS = $("#sheet-skill-acrobatics-cs");
        CharacterObj.Skills.AcroAbil = $("#sheet-skill-acrobatics-ability");
        CharacterObj.Skills.AcroRank = $("#sheet-skill-acrobatics-rank");
        CharacterObj.Skills.AcroMisc = $("#sheet-skill-acrobatics-misc");
        CharacterObj.Skills.ApprCS = $("#sheet-skill-appraise-cs");
        CharacterObj.Skills.ApprAbil = $("#sheet-skill-appraise-ability");
        CharacterObj.Skills.ApprRank = $("#sheet-skill-appraise-rank");
        CharacterObj.Skills.ApprMisc = $("#sheet-skill-appraise-misc");
        CharacterObj.Skills.BlufCS = $("#sheet-skill-bluff-cs");
        CharacterObj.Skills.BlufAbil = $("#sheet-skill-bluff-ability");
        CharacterObj.Skills.BlufRank = $("#sheet-skill-bluff-rank");
        CharacterObj.Skills.BlufMisc = $("#sheet-skill-bluff-misc");
        CharacterObj.Skills.ClimCS = $("#sheet-skill-climb-cs");
        CharacterObj.Skills.ClimAbil = $("#sheet-skill-climb-ability");
        CharacterObj.Skills.ClimRank = $("#sheet-skill-climb-rank");
        CharacterObj.Skills.ClimMisc = $("#sheet-skill-climb-misc");
        CharacterObj.Skills.DiplCS = $("#sheet-skill-diplomacy-cs");
        CharacterObj.Skills.DiplAbil = $("#sheet-skill-diplomacy-ability");
        CharacterObj.Skills.DiplRank = $("#sheet-skill-diplomacy-rank");
        CharacterObj.Skills.DiplMisc = $("#sheet-skill-diplomacy-misc");
        CharacterObj.Skills.DisaCS = $("#sheet-skill-disable-device-cs");
        CharacterObj.Skills.DisaAbil = $("#sheet-skill-disable-device-ability");
        CharacterObj.Skills.DisaRank = $("#sheet-skill-disable-device-rank");
        CharacterObj.Skills.DisaMisc = $("#sheet-skill-disable-device-misc");
        CharacterObj.Skills.DisgCS = $("#sheet-skill-disguise-cs");
        CharacterObj.Skills.DisgAbil = $("#sheet-skill-disguise-ability");
        CharacterObj.Skills.DisgRank = $("#sheet-skill-disguise-rank");
        CharacterObj.Skills.DisgMisc = $("#sheet-skill-disguise-misc");
        CharacterObj.Skills.EscaCS = $("#sheet-skill-escape-artist-cs");
        CharacterObj.Skills.EscaAbil = $("#sheet-skill-escape-artist-ability");
        CharacterObj.Skills.EscaRank = $("#sheet-skill-escape-artist-rank");
        CharacterObj.Skills.EscaMisc = $("#sheet-skill-escape-artist-misc");
        CharacterObj.Skills.FlyCS = $("#sheet-skill-fly-cs");
        CharacterObj.Skills.FlyAbil = $("#sheet-skill-fly-ability");
        CharacterObj.Skills.FlyRank = $("#sheet-skill-fly-rank");
        CharacterObj.Skills.FlyMisc = $("#sheet-skill-fly-misc");
        CharacterObj.Skills.HandCS = $("#sheet-skill-handle-animal-cs");
        CharacterObj.Skills.HandAbil = $("#sheet-skill-handle-animal-ability");
        CharacterObj.Skills.HandRank = $("#sheet-skill-handle-animal-rank");
        CharacterObj.Skills.HandMisc = $("#sheet-skill-handle-animal-misc");
        CharacterObj.Skills.HealCS = $("#sheet-skill-heal-cs");
        CharacterObj.Skills.HealAbil = $("#sheet-skill-heal-ability");
        CharacterObj.Skills.HealRank = $("#sheet-skill-heal-rank");
        CharacterObj.Skills.HealMisc = $("#sheet-skill-heal-misc");
        CharacterObj.Skills.IntiCS = $("#sheet-skill-intimidate-cs");
        CharacterObj.Skills.IntiAbil = $("#sheet-skill-intimidate-ability");
        CharacterObj.Skills.IntiRank = $("#sheet-skill-intimidate-rank");
        CharacterObj.Skills.IntiMisc = $("#sheet-skill-intimidate-misc");
        CharacterObj.Skills.ArcaCS = $("#sheet-skill-arcana-cs");
        CharacterObj.Skills.ArcaAbil = $("#sheet-skill-arcana-ability");
        CharacterObj.Skills.ArcaRank = $("#sheet-skill-arcana-rank");
        CharacterObj.Skills.ArcaMisc = $("#sheet-skill-arcana-misc");
        CharacterObj.Skills.DungCS = $("#sheet-skill-dungeoneering-cs");
        CharacterObj.Skills.DungAbil = $("#sheet-skill-dungeoneering-ability");
        CharacterObj.Skills.DungRank = $("#sheet-skill-dungeoneering-rank");
        CharacterObj.Skills.DungMisc = $("#sheet-skill-dungeoneering-misc");
        CharacterObj.Skills.EngiCS = $("#sheet-skill-engineering-cs");
        CharacterObj.Skills.EngiAbil = $("#sheet-skill-engineering-ability");
        CharacterObj.Skills.EngiRank = $("#sheet-skill-engineering-rank");
        CharacterObj.Skills.EngiMisc = $("#sheet-skill-engineering-misc");
        CharacterObj.Skills.GeogCS = $("#sheet-skill-geography-cs");
        CharacterObj.Skills.GeogAbil = $("#sheet-skill-geography-ability");
        CharacterObj.Skills.GeogRank = $("#sheet-skill-geography-rank");
        CharacterObj.Skills.GeogMisc = $("#sheet-skill-geography-misc");
        CharacterObj.Skills.HistCS = $("#sheet-skill-history-cs");
        CharacterObj.Skills.HistAbil = $("#sheet-skill-history-ability");
        CharacterObj.Skills.HistRank = $("#sheet-skill-history-rank");
        CharacterObj.Skills.HistMisc = $("#sheet-skill-history-misc");
        CharacterObj.Skills.LocaCS = $("#sheet-skill-local-cs");
        CharacterObj.Skills.LocaAbil = $("#sheet-skill-local-ability");
        CharacterObj.Skills.LocaRank = $("#sheet-skill-local-rank");
        CharacterObj.Skills.LocaMisc = $("#sheet-skill-local-misc");
        CharacterObj.Skills.NatuCS = $("#sheet-skill-nature-cs");
        CharacterObj.Skills.NatuAbil = $("#sheet-skill-nature-ability");
        CharacterObj.Skills.NatuRank = $("#sheet-skill-nature-rank");
        CharacterObj.Skills.NatuMisc = $("#sheet-skill-nature-misc");
        CharacterObj.Skills.NobiCS = $("#sheet-skill-nobility-cs");
        CharacterObj.Skills.NobiAbil = $("#sheet-skill-nobility-ability");
        CharacterObj.Skills.NobiRank = $("#sheet-skill-nobility-rank");
        CharacterObj.Skills.NobiMisc = $("#sheet-skill-nobility-misc");
        CharacterObj.Skills.PlanCS = $("#sheet-skill-planes-cs");
        CharacterObj.Skills.PlanAbil = $("#sheet-skill-planes-ability");
        CharacterObj.Skills.PlanRank = $("#sheet-skill-planes-rank");
        CharacterObj.Skills.PlanMisc = $("#sheet-skill-planes-misc");
        CharacterObj.Skills.ReliCS = $("#sheet-skill-religion-cs");
        CharacterObj.Skills.ReliAbil = $("#sheet-skill-religion-ability");
        CharacterObj.Skills.ReliRank = $("#sheet-skill-religion-rank");
        CharacterObj.Skills.ReliMisc = $("#sheet-skill-religion-misc");
        CharacterObj.Skills.LingCS = $("#sheet-skill-linguistics-cs");
        CharacterObj.Skills.LingAbil = $("#sheet-skill-linguistics-ability");
        CharacterObj.Skills.LingRank = $("#sheet-skill-linguistics-rank");
        CharacterObj.Skills.LingMisc = $("#sheet-skill-linguistics-misc");
        CharacterObj.Skills.PercCS = $("#sheet-skill-perception-cs");
        CharacterObj.Skills.PercAbil = $("#sheet-skill-perception-ability");
        CharacterObj.Skills.PercRank = $("#sheet-skill-perception-rank");
        CharacterObj.Skills.PercMisc = $("#sheet-skill-perception-misc");
        CharacterObj.Skills.Perf1CS = $("#sheet-skill-perform-1-cs");
        CharacterObj.Skills.Perf1Abil = $("#sheet-skill-perform-1-ability");
        CharacterObj.Skills.Perf1Rank = $("#sheet-skill-perform-1-rank");
        CharacterObj.Skills.Perf1Misc = $("#sheet-skill-perform-1-misc");
        CharacterObj.Skills.Perf2CS = $("#sheet-skill-perform-2-cs");
        CharacterObj.Skills.Perf2Abil = $("#sheet-skill-perform-2-ability");
        CharacterObj.Skills.Perf2Rank = $("#sheet-skill-perform-2-rank");
        CharacterObj.Skills.Perf2Misc = $("#sheet-skill-perform-2-misc");
        CharacterObj.Skills.Prof1CS = $("#sheet-skill-profession-1-cs");
        CharacterObj.Skills.Prof1Abil = $("#sheet-skill-profession-1-ability");
        CharacterObj.Skills.Prof1Rank = $("#sheet-skill-profession-1-rank");
        CharacterObj.Skills.Prof1Misc = $("#sheet-skill-profession-1-misc");
        CharacterObj.Skills.Prof2CS = $("#sheet-skill-profession-2-cs");
        CharacterObj.Skills.Prof2Abil = $("#sheet-skill-profession-2-ability");
        CharacterObj.Skills.Prof2Rank = $("#sheet-skill-profession-2-rank");
        CharacterObj.Skills.Prof2Misc = $("#sheet-skill-profession-1-misc");
        CharacterObj.Skills.RideCS = $("#sheet-skill-ride-cs");
        CharacterObj.Skills.RideAbil = $("#sheet-skill-ride-ability");
        CharacterObj.Skills.RideRank = $("#sheet-skill-ride-rank");
        CharacterObj.Skills.RideMisc = $("#sheet-skill-ride-misc");
        CharacterObj.Skills.SleiCS = $("#sheet-skill-sleight-of-hand-cs");
        CharacterObj.Skills.SleiAbil = $("#sheet-skill-sleight-of-hand-ability");
        CharacterObj.Skills.SleiRank = $("#sheet-skill-sleight-of-hand-rank");
        CharacterObj.Skills.SleiMisc = $("#sheet-skill-sleight-of-hand-misc");
        CharacterObj.Skills.SpelCS = $("#sheet-skill-spellcraft-cs");
        CharacterObj.Skills.SpelAbil = $("#sheet-skill-spellcraft-ability");
        CharacterObj.Skills.SpelRank = $("#sheet-skill-spellcraft-rank");
        CharacterObj.Skills.SpelMisc = $("#sheet-skill-spellcraft-misc");
        CharacterObj.Skills.SteaCS = $("#sheet-skill-stealth-cs");
        CharacterObj.Skills.SteaAbil = $("#sheet-skill-stealth-ability");
        CharacterObj.Skills.SteaRank = $("#sheet-skill-stealth-rank");
        CharacterObj.Skills.SteaMisc = $("#sheet-skill-stealth-misc");
        CharacterObj.Skills.SurvCS = $("#sheet-skill-survival-cs");
        CharacterObj.Skills.SurvAbil = $("#sheet-skill-survival-ability");
        CharacterObj.Skills.SurvRank = $("#sheet-skill-survival-rank");
        CharacterObj.Skills.SurvMisc = $("#sheet-skill-survival-misc");
        CharacterObj.Skills.SwimCS = $("#sheet-skill-swim-cs");
        CharacterObj.Skills.SwimAbil = $("#sheet-skill-swim-ability");
        CharacterObj.Skills.SwimRank = $("#sheet-skill-swim-rank");
        CharacterObj.Skills.SwimMisc = $("#sheet-skill-swim-misc");
        CharacterObj.Skills.UmdCS = $("#sheet-skill-umd-cs");
        CharacterObj.Skills.UmdAbil = $("#sheet-skill-umd-ability");
        CharacterObj.Skills.UmdRank = $("#sheet-skill-umd-rank");
        CharacterObj.Skills.UmdMisc = $("#sheet-skill-umd-misc");
        
        sessionStorage.setItem('activeCharacter', JSON.stringify(CharacterObj));
        CharacterSheet.Util.saveCharacterToServer();
    },




    "Init": function ()
    {
        CharacterSheet.Events.addAll()
        CharacterSheet.Util.initializeStatValueArray();
    }
};


$(document).ready(function()
    {
        CharacterSheet.Init();
    }
);