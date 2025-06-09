export const hasPermission = (
  permissionForCheck: string[],
  permissions: string[]
) => {
  if (permissions) {
    return permissionForCheck.some((permission) => {
      return permissions.includes(permission);
    });
  }
};
