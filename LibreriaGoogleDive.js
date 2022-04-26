/**

*@NApiVersion 2.x

*@NScriptType ScheduledScript
*@NModuleScope SameAccount

*/

define
(
    ["require", "N/https", "N/record"],
    function(require, https, record)
    {
        // create a folder in google drive with parameters name and parent 
        function create_folder(name,parent_folder)
        {
            // conection whth https
            var drive_record = record.load({type: 'customrecord_third_party', id: 1, isDynamic: true});
            var access_token = drive_record.getValue({fieldId: 'custrecord_access_token'});
            var boundary = 'tkoboundary';
            var headers = {};

            headers['content-type'] = 'multipart/related; boundary=' + boundary;
            headers['Authorization'] = 'Bearer ' + access_token;

            var body = [];
            body.push('--' + boundary);
            body.push('Content-Disposition: form-data; name="f1"; filename="drive.json"');
            body.push('Content-Type: application/json');
            body.push('');
            body.push('{"name": "'+ name +'","mimeType": "application/vnd.google-apps.folder","parents": ["'+ parent_folder +'"]}');
            body.push('--' + boundary +'--');
            body.push('');
            
            try
            {
                var response = https.post({
                    url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true',
                    headers: headers,
                    body: body.join('\r\n')
                });
                log.debug({ title: 'response', details: response.body });
              return response;
            }
            catch (e)
            {
                log.error({ title: 'Failed to submit file', details: (e.message || e.toString()) + (e.getStackTrace ? (' \n \n' + e.getStackTrace().join(' \n')) : '') });
            }
        }
        
        return{
            create_folder: create_folder
        };

    }
);