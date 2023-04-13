import { CheckboxOptionDataType, RadioOptionDataType } from "../components/";

export const COUNTRY_CHECKBOX_DATA : CheckboxOptionDataType[] = [
    {   id: "1",    checked: false,     displayText: "Russia",  name:"country-russia"   },
    {   id: "2",    checked: true,      displayText: "USA",     name:"country-usa"      },
    {   id: "3",    checked: true,      displayText: "Germany",  name:"country-germany"  },
];

export const TIMEUNIT_CHECKBOX_DATA : CheckboxOptionDataType[] = [
    {   id: "1",    checked: true,      displayText: "Days",    name:"timeunit-days"     },
    {   id: "2",    checked: false,     displayText: "Weeks",   name:"timeunit-weeks"    },
    {   id: "3",    checked: true,      displayText: "Years",   name:"timeunit-years"    },
];

// To convert Checkbox dummy data to Radio, remove the name field (radio will have a group name) and ensure only one option is checked.
export const COUNTRY_RADIO_DATA : RadioOptionDataType[] = COUNTRY_CHECKBOX_DATA.map(({name, ...keep}, idx) => firstItemChecked({idx, keep}));
export const TIMEUNIT_RADIO_DATA : RadioOptionDataType[] = TIMEUNIT_CHECKBOX_DATA.map(({name, ...keep}, idx) => firstItemChecked({idx, keep}));

function firstItemChecked({idx, keep} : any){
    if(idx === 0){
        return {
            ...keep,
            checked: true,
        }
    }
    if(!keep.checked){
        return keep;
    }
    else{
        return {
            ...keep,
            checked: false,
        }
    }
}
