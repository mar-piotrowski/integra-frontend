export const dashboardAccountItems = {
    id: "accountDashboard",
    // title: "Konto",
    type: "group",
    children: [
        {
            id: "profile",
            title: "Profil",
            type: "item",
            url: "/management-panel/account",
        },
        {
            id: "privacy",
            title: "Prywatność",
            type: "item",
            url: "/management-panel/account/privacy",
        }
    ]
}