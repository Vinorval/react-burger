import React from "react";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import entryFormStyles from './entryForm.module.css';
import { Link } from "react-router-dom";

export default function EntryForm ({ children, title, button, entry, password, toEntry, toPassword, linkEntry, linkPassword }) {
    return (
        <section className={entryFormStyles.section} >
            <div className={entryFormStyles.conteiner} >
                <h2 className={entryFormStyles.title} >{title}</h2>
                <div className={entryFormStyles.form} >
                    {children}
                </div>
                <div className={entryFormStyles.button}>
                    <Button type="primary" size="medium">
                        {button}
                    </Button>
                </div>
                <div className={entryFormStyles.textBlock}>
                    <p className={entryFormStyles.text} >{entry} <Link to={`${linkEntry}`} className={entryFormStyles.link} >{toEntry}</Link></p>
                    <p className={entryFormStyles.text} >{password} <Link to={`${linkPassword}`} className={entryFormStyles.link} >{toPassword}</Link></p>
                </div>
            </div>
        </section>
    )
}