import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

function SelectMultiLangComponent() {
    const { t, i18n } = useTranslation()

    const langChangeHandle = (langValue) => {
        i18n.changeLanguage(langValue.target.value)
    }
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">{t('common.language')}</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={ i18n.language }
                onChange={ langChangeHandle }
                label="Language"
            >
                <MenuItem value={'en'}>EN</MenuItem>
                <MenuItem value={'ua'}>UA</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectMultiLangComponent