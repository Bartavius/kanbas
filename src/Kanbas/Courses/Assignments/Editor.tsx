export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" rows={9} cols={45} >
          The assignment is available online Submit a link to the landing page of your web application running
          on Netlify. The landing page should include the following: Your full name and section Links to each of the lab
          assignments Link to the Kanbas application Links to all relevant source code repositories
          The Kanbas application should include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select name="assignment-group" id="wd-group">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select name="display-grade-as" id="wd-display-grade-as">
                <option value="PERCENTAGE">
                    Percentage
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select name="submission-type" id="wd-submission-type">
                <option value="Online">Online</option>
              </select><br /><br />
              <div>
                    <label htmlFor="wd-submission-type-online">Online Entry Options:</label><br />
                    <input type="checkbox" id="wd-text-entry" />
                    <label htmlFor="wd-text-entry">Text Entry</label><br/>
                    <input type="checkbox" id="wd-website-url" />
                    <label htmlFor="wd-website-url">Website URL</label><br/>
                    <input type="checkbox" id="wd-media-recordings" />
                    <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                    <input type="checkbox" id="wd-student-annotation" />
                    <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                    <input type="checkbox" id="wd-file-upload" />
                    <label htmlFor="wd-file-upload">File Uploads</label><br/>
               </div><br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
                <label htmlFor="wd-assign-to">Assign to</label><br />
                <input id="wd-assign-to" value="Everyone" /><br />
                <label htmlFor="wd-due-date">Due</label><br />
                <input type="date" id="wd-due-date" value="2024-05-13"/><br />

                <table>
                    <tr>
                        <td><label htmlFor="wd-available-from">Available from</label></td>
                        <td align="left"><label htmlFor="wd-available-until">Until</label></td>
                    </tr>
                    <tr>
                        <td><input type="date" id="wd-available-from" value="2024-05-06"/></td>
                        <td><input type="date" id="wd-available-until" value="2024-05-20"/></td>
                    </tr>
                </table>
            
                {/* NEED TO FORMAT THE UNTIL PART AND ADD CANCEL / SAVE BUTTON ALONG WITH SECTION LINE.*/}
            </td>
          </tr>
        
          
          
        </table>
        <hr />
        <div id="wd-assignment-submission-buttons">
            <table width="100%">
                <tr>
                    <td align="right">
                        <button type="button">Cancel</button>
                        <button type="button">Save</button>
                    </td>
                </tr>
            </table>
        </div>
      </div>
  );}
  