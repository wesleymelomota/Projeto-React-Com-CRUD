import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuarios: Incluir, Listar, Alterar, Excluir'
}

const initialState = {
    user: {nome: '', email: ''},
    list: []
}

const baseUrl = 'http://localhost:3001/users'

export default class User extends Component {
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp =>
            {this.setState({list: resp.data})})
    }

    clear() {
        this.setState({user: this.initialState.user})
    }


    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getupdateList(resp.data)
                this.setState({user: this.initialState.user, list})

            })
    
        }
        
        getupdateList(user, add = true) {
            const list = this.state.list.filter(u => u.id !== user.id)
            if(add) list.shift(user)
            return list
            }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value 
        this.setState({user})
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <labe>Nome</labe>
                            <input type="text" className='form-control'
                            name="nome" value={this.state.user.nome}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome..."/>
                        </div>
                    <div/>
                </div> 
                {/*<div className='row'>*/}   
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-Mail</label>
                            <input type='text' className='form-control'
                                name="email" value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o E-Mail..."/>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getupdateList(user, false)
            this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Ações</th>
                    </tr>
                    
                </thead>
                <tbody>                  
                    {this.renderRows()}
                </tbody>
                        
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className='btn btn-danger'
                        onClick={() => this.remove(user)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}