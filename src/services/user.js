import { get, post, del, put } from "./post";
import { serverUrl } from "./tools";

export const GetApiList = (data) => get(serverUrl + "/interface", data);

export const GetApiAll = () => get(serverUrl + "/interface");

export const PostNewApi = (data) => post(serverUrl + "/interface", data);

export const UpdateApi = (data) => put(serverUrl + "/interface", data);

export const DeleteApi = (id) => del(serverUrl + `/interface/${id}`);

export const RunApi = (id) => get(serverUrl + `/interface/run/${id}`);

export const Register = (data) => post(serverUrl + "/api/v1/user/register", data);

export const Login = (data) => post(serverUrl + "/api/v1/user/login", data);

export const Logout = () => del(serverUrl + "/api/v1/user/logout", {});

export const UpdateSubjectOpt = (data) => put(serverUrl + "/api/v1/user/subjects", data);

export const GetSubjectOptList = () => get(serverUrl + "/api/v1/user/subjects");

export const UpdateOptTime = (data) => put(serverUrl + "/api/v1/user/records", data);

export const GetRecordList = () => get(serverUrl + "/api/v1/admin/user/records");

export const UpdateUserInActive = (data) => post(serverUrl + "/api/v1/user/inactive", data);

export const ReportUserActivity = (data) => post(serverUrl + "/api/v1/user/activity", data);

export const ReportPage = (data) => post(serverUrl + "/api/v1/user/page", data);

export const Ping = (data) => post(serverUrl + "/api/v1/ping", data);

export const VISIT_TYPE = 8;
