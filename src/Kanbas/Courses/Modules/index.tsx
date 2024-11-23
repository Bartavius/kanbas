import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControl";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { useUserAccess } from "../../Account/UserAccess";

export default function Modules() {
  
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const [moduleName, setModuleName] = useState("");
    const [loading, setLoading] = useState(true);
    const facultyAccess = useUserAccess() > 1; // admin and faculty has the same privilege

    const createModuleForCourse = async () => {
      if (!cid) return;
      const newModule = { name: moduleName, course: cid };
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
    };
    const removeModule = async (moduleId: string) => {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    };
    const saveModule = async (module: any) => {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    };
    const fetchModules = async () => {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
      setLoading(false);
    };
    useEffect(() => {
      fetchModules();
    }, []);

    return (
      <div className="container">
        { loading ? <div>Loading...</div> : <div>

        { facultyAccess ? <div className="faculty-access">
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
          addModule={createModuleForCourse} /><br /><br /><br /><br />
          </div> : <div></div>
          }

        <ul id="wd-modules" className="list-group rounded-0">
          {modules
            .map((module: any) => (
              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title wd-title p-3 ps-2 bg-secondary">
                  { facultyAccess ? 
                  <div className="faculty-access">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  { module.editing && (
                    <input className="form-control w-50 d-inline-block"
                          onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveModule({ ...module, editing: false })
                            }
                          }}
                          defaultValue={module.name}/>
                  )}
                  <ModuleControlButtons moduleId={module._id}
                      deleteModule={ (moduleId) => removeModule(moduleId) }
                      editModule={ (moduleId) => {dispatch(editModule(moduleId))} } />
                  </div>
                  : <div>{module.name}</div>}
                  
                </div>


                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li className="wd-lesson list-group-item p-3 ps-1">
                        { currentUser.role === "FACULTY" ? 
                        <div className="faculty-access">
                        <BsGripVertical className="me-2 fs-3" />
                          {lesson.name}
                        <LessonControlButtons />
                        </div>
                        : <div>{lesson.name}</div>}
                      </li>
                    ))}
                  </ul>
                )}
            </li>
            ))
          }
        </ul>
      </div>}
      </div>
    )
  }