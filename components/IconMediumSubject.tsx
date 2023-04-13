import React from 'react';
import {Icon, IconMediumId} from './';

export enum Subject{
    mathematics,
    english,
    sociology,
    physics,
    biology,
    history,
    chemistry,
    computing,
    literature,
    geography,
    languages_en,
    languages_de,
    languages_fr,
    languages_es,
    economics,
    robotics,
}

interface IconSubjectProps{
    subject : Subject
}

export default function IconSubject({subject} : IconSubjectProps){
    const id : IconMediumId = getIconMediumId(subject);
    return <Icon idMedium={id} />
}

function getIconMediumId(subject : Subject){
    switch(subject){
        case Subject.mathematics:
            return IconMediumId.mathematics;

        case Subject.english:
            return IconMediumId.english;

        case Subject.sociology:
            return IconMediumId.mathematics;

        case Subject.physics:
            return IconMediumId.physics;

        case Subject.biology:
            return IconMediumId.biology;

        case Subject.history:
            return IconMediumId.history;

        case Subject.chemistry:
            return IconMediumId.chemistry;

        case Subject.computing:
            return IconMediumId.computing;

        case Subject.literature:
            return IconMediumId.literature;

        case Subject.geography:
            return IconMediumId.geography;

        case Subject.languages_en:
            return IconMediumId.langEn;

        case Subject.languages_de:
            return IconMediumId.langDe;

        case Subject.languages_fr:
            return IconMediumId.langFr;

        case Subject.languages_es:
            return IconMediumId.langEs;

        case Subject.economics:
            return IconMediumId.economics;

        case Subject.robotics:
            return IconMediumId.robotics;

        default:
            return IconMediumId.robotics;
    }
}