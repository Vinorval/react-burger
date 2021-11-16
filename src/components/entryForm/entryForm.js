import React from "react";
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import entryFormStyles from './entryForm.module.css'

export default function EntryForm ({ children, title, button, entry, password, toEntry, toPassword }) {
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
                    <p className={entryFormStyles.text} >{entry} <a className={entryFormStyles.link} >{toEntry}</a></p>
                    <p className={entryFormStyles.text} >{password} <a className={entryFormStyles.link} >{toPassword}</a></p>
                </div>
            </div>
        </section>
    )
}