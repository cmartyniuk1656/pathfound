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