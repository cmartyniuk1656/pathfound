var CharacterObj =
{
    "UserID": "",
    "Name": "",
    "Alignment": "",
    "Deity": "",
    "Race": "",
    "Size": "",
    "Gender": "",
    "Age": ""
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