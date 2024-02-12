export class Router {
    routes = {}

    // mapeamento da rota
    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
        //acessar a função abaixo, só dá se usar o this
        this.handle()
    }
    
    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname]
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('selected');
        })

        document.querySelector(`nav a[href="${pathname}"]`).classList.add('selected')
    }
}