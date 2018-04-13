var CharacterObj =
{
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
    "AcroCS": false,
    "AcroAbil": 0,
    "AcroRank": 0,
    "AcroMisc": 0,
    "ApprCS": false,
    "ApprAbil": 0,
    "ApprRank": 0,
    "ApprMisc": 0



}


var CharacterSheet =
{
    "Events":
    {
        "addAll": function ()
        {
            console.info("Adding events...");
            $("#character-name-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-name").val(CharacterObj.Name);
                    $("#sidebar-name-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-name-div").addClass('hidden');
                }
            });
            $("#character-alignment-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-alignment").val(CharacterObj.Alignment);
                    $("#sidebar-alignment-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-alignment-div").addClass('hidden');
                }
            });
            $("#character-deity-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-deity").val(CharacterObj.Deity);
                    $("#sidebar-deity-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-deity-div").addClass('hidden');
                }
            });
            $("#character-race-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-race").val(CharacterObj.Race);
                    $("#sidebar-race-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-race-div").addClass('hidden');
                }
            });
            $("#character-size-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-size").val(CharacterObj.Size);
                    $("#sidebar-size-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-size-div").addClass('hidden');
                }
            });
            $("#character-gender-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-gender").val(CharacterObj.Gender);
                    $("#sidebar-gender-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-gender-div").addClass('hidden');
                }
            });
            $("#character-age-visible").change(function()
            {
                if (this.checked)
                {
                    console.info("checked");
                    $("#sidebar-age").val(CharacterObj.Age);
                    $("#sidebar-age-div").removeClass('hidden');
                }
                else
                {
                    console.info("unchecked");
                    $("#sidebar-age-div").addClass('hidden');
                }
            });

            $("#character-sheet-save").click(function()
                {
                    CharacterObj.Name = $("#character-name").val();
                    CharacterObj.Alignment = $("#character-alignment").val();
                    CharacterObj.Deity = $("#character-deity").val();
                    CharacterObj.Race = $("#character-race").val();
                    CharacterObj.Size = $("#character-size").val();
                    CharacterObj.Gender = $("#character-gender").val();
                    CharacterObj.Age = $("#character-age").val();
                });

            $("#character-sheet-load").click(function()
                {
                    console.info("Name: " + CharacterObj.Name);
                    console.info("Alignment: " + CharacterObj.Alignment);
                    console.info("Deity: " + CharacterObj.Deity);
                    console.info("Race: " + CharacterObj.Race);
                    console.info("Size: " + CharacterObj.Size);
                    console.info("Gender: " + CharacterObj.Gender);
                    console.info("Age: " + CharacterObj.Age);
                });
        }
    },




    "Init": function ()
    {
        console.info("Initializing...");
        CharacterSheet.Events.addAll()
    }
};


$(document).ready(function()
    {
        console.info("dom is ready");
        CharacterSheet.Init();
    }
);