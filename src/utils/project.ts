import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
