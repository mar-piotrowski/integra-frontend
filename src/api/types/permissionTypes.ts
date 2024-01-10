import { MutationRequest } from "./apiTypes";
import { UserId } from "./userTypes";

export type AddUserPermissionsRequest = {
    userId: number
    permissions: number[];
};

type RemoveUserPermissionPayload = {
    permissions: number[];
};

export type RemoveUserPermissionsRequest = MutationRequest<RemoveUserPermissionPayload> & UserId;

export type Permission = {
    type: number;
    name: string;
    code: number;
    asignmentDate: Date;
}