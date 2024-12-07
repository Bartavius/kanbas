import { BsGripVertical, BsPlus } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControl";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { useUserAccess } from "../../Account/UserAccess";
import { FaPencil, FaTrash } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Modules() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [ modules, setModules ] = useState<any>([]);
  const [ moduleEdits, setModuleEdits ] = useState<any>([]); //for editing purposes
  const [ moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(true);
  const facultyAccess = useUserAccess() > 1; // admin and faculty has the same privilege
  const [reloadModules, setReloadModules] = useState<boolean>(false);

  const editModule = (moduleId: string) => {
    setModules(modules.map((m: any) =>
      m._id === moduleId ? { ...m, editing: true } : m
    ) as any)
  }

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    await coursesClient.createModuleForCourse(cid, newModule);
    setReloadModules(!reloadModules);
  };
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    setReloadModules(!reloadModules);
  };
  const saveModule = async (moduleId: string, module: any) => {
    await modulesClient.updateModule(moduleId, module);
    setReloadModules(!reloadModules);
  };
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    setModules(modules);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchModules();
  }, [cid, reloadModules]);

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {facultyAccess && (
            <div className="faculty-access">
              <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={createModuleForCourse}
              />
              <br />
              <br />
              <br />
              <br />
            </div>
          )}

          <ul id="wd-modules" className="list-group rounded-0">
            {modules.map((module: any) => (
              <li
                className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
                key={module._id}
              >
                <div className="wd-title wd-title p-3 ps-2 bg-secondary">
                  {facultyAccess ? (
                    <div className="faculty-access">
                      <BsGripVertical className="me-2 fs-3" />
                      {!module.editing && module.name}
                      {module.editing && (
                        
                        <input
                          className="form-control w-50 d-inline-block"
                          onChange={(e) => setModuleEdits({ name: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveModule(module._id, moduleEdits);
                            }
                          }}
                          defaultValue={module.name}
                        />

                      )}

                      <ModuleControlButtons moduleId={module._id}
                      deleteModule={ (moduleId) => removeModule(moduleId) }
                      editModule={ (moduleId) => editModule(moduleId) } />
                    </div>
                  ) : (
                    <div>{module.name}</div>
                  )}
                </div>

                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li
                        className="wd-lesson list-group-item p-3 ps-1"
                        key={lesson._id}
                      >
                        {currentUser.role === "FACULTY" ? (
                          <div className="faculty-access">
                            <BsGripVertical className="me-2 fs-3" />
                            {lesson.name}
                            <LessonControlButtons />
                          </div>
                        ) : (
                          <div>{lesson.name}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
