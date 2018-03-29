var CharacterObj =
{
    "Name": ""
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
                        $("#test").removeClass('hidden');
                    }
                    else
                    {
                        console.info("unchecked");
                        $("#test").addClass('hidden');
                    }
                })

            $("#character-sheet-save").click(function()
                {
                    CharacterObj.Name = $("#character-name").val();
                })

            $("#character-sheet-load").click(function()
                {
                    console.info("Name: " + CharacterObj.Name);
                })
        }
    },




    "Init": function ()
    {
        console.info("Initializing...");
        CharacterSheet.Events.addAll()
    }
}


$(document).ready(function()
    {
        console.info("dom is ready");
        CharacterSheet.Init();
    }
)