export default function checkButtonPermissions(moduleSlug, actionSlug) {

    let permissions = localStorage.getItem("permissions");
    permissions = JSON.parse(permissions);
    if (permissions?.hasOwnProperty(moduleSlug)) {
        let actionsObject = permissions[moduleSlug];
        if ((actionsObject != null) && (actionsObject.hasOwnProperty(actionSlug))) {
            if (actionsObject[actionSlug] == true) return true;
            else return false;
        }
        if ((actionsObject != null) && (actionSlug === "changeStatus" && (actionsObject.hasOwnProperty('delete')))) return true;
        else return false;
    } else return false;


}

