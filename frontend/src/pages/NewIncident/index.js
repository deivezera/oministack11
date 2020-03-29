import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function NewIncident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory(); 

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

        history.push('/profile');
        }
        catch(err){
            alert('erro ao cadastrar caso');
        }

    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/Profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)} type="text"/>
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}