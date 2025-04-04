import { index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/login.jsx"),
    layout("routes/mail/mainframe.jsx", {id: "route-chat"}, [
        route("chat", "routes/chat/chatview.jsx", [
            route(":id?", "routes/chat/chatwindow.jsx")
        ])
    ]),
    route(":folder", "routes/mail/mainframe.jsx", [
        route(":type?", 'routes/mail/mailview.jsx')
    ])
];
