import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
    return (
        <div>
            <h2>Home</h2>
            <table>
                <tr>
                    <td valign="top">
                        <Modules />
                    </td>
                    <td valign="top">
                        <CourseStatus />
                    </td>
                </tr>
            </table>
        </div>
    )
  ;}
  