import { index, layout, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/login.jsx"),
    layout("routes/mail/mainframe.jsx", {id: "route-chat"}, [
        ...prefix("u", [
            route(":uindex/chat", "routes/chat/chatview.jsx", [
                route(":id?", "routes/chat/chatwindow.jsx")
            ])
        ])
    ]),
    ...prefix("u", [
        route(":uindex/:folder", "routes/mail/mainframe.jsx", [
            route(":type?", 'routes/mail/mailview.jsx')
        ])
    ]),    
];
