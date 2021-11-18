import React from "react";
import PropTypes from 'prop-types';
import entryFormStyles from './entryForm.module.css';
import { Link } from "react-router-dom";

export default function EntryForm ({ children, title, entry, password, toEntry, toPassword, linkEntry, linkPassword }) {
    return (
        <section className={entryFormStyles.section} >
            <div className={entryFormStyles.conteiner} >
                <h2 className={entryFormStyles.title} >{title}</h2>
                {children}
                <div className={entryFormStyles.textBlock}>
                    <p className={entryFormStyles.text} >{entry} <Link to={`${linkEntry}`} className={entryFormStyles.link} >{toEntry}</Link></p>
                    <p className={entryFormStyles.text} >{password} <Link to={`${linkPassword}`} className={entryFormStyles.link} >{toPassword}</Link></p>
                </div>
            </div>
        </section>
    )
}

EntryForm.propTypes = {
    title: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
    linkEntry: PropTypes.string.isRequired,
    toEntry: PropTypes.string.isRequired,
    password: PropTypes.string,
    linkPassword: PropTypes.string,
    toPassword: PropTypes.string,
};