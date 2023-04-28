import { ICON_ID } from './IconRecords';
import { SUBJECT } from '../../utils/subjects';

export function getIconIdFromSubject(subject : SUBJECT){
    switch(subject){
        case SUBJECT.mathematics:
            return ICON_ID.subjectMathematics;

        case SUBJECT.english:
            return ICON_ID.subjectEnglish;

        case SUBJECT.sociology:
            return ICON_ID.subjectSociology;

        case SUBJECT.physics:
            return ICON_ID.subjectPhysics;

        case SUBJECT.biology:
            return ICON_ID.subjectBiology;

        case SUBJECT.history:
            return ICON_ID.subjectHistory;

        case SUBJECT.chemistry:
            return ICON_ID.subjectChemistry;

        case SUBJECT.computing:
            return ICON_ID.subjectComputing;

        case SUBJECT.literature:
            return ICON_ID.subjectLiterature;

        case SUBJECT.geography:
            return ICON_ID.subjectGeography;

        case SUBJECT.languages_en:
            return ICON_ID.subjectLangEn;

        case SUBJECT.languages_de:
            return ICON_ID.subjectLangDe;

        case SUBJECT.languages_fr:
            return ICON_ID.subjectLangFr;

        case SUBJECT.languages_es:
            return ICON_ID.subjectLangEs;

        case SUBJECT.economics:
            return ICON_ID.subjectEconomics;

        case SUBJECT.robotics:
            return ICON_ID.subjectRobotics;

        default:
            return ICON_ID.subjectRobotics;
    }
}