/**

*@NApiVersion 2.x

*@NScriptType UserEventScript

*/

define
	(
		['./lib/GoogleDriveMethods'],

		function(GoogleDriveMethods)
		{
			function beforeSubmit(scriptContext)
			{
                if (scriptContext.type == scriptContext.UserEventType.EDIT)
				{
                    GoogleDriveMethods.create_folder("n_order","0AO93ZL42waZPUk9PVA");
				}
			}
			return{
				beforeSubmit: beforeSubmit
			};
		}
	);
