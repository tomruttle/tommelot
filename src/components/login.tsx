import { useTranslations } from "next-intl";
import { States } from "../utils/states";
import { isString } from "../utils/shared";
import Input from "./form/input";
import Spacer from "./form/spacer";
import Button from "./form/button";
import { colors } from "../utils/constants";

export default function Login({ searchState }: { searchState?: string }) {
  const t = useTranslations();

  const isIncorrectPassword = isString(searchState) && searchState === States.Incorrect.toString();
  const inputBorderColor = isIncorrectPassword ? colors.INPUT_ERROR_BORDER_COLOR : colors.BORDER_COLOR;
  const inputFocusBorderColor = isIncorrectPassword ? colors.INPUT_ERROR_BORDER_COLOR : colors.INPUT_FOCUS_BORDER_COLOR

  return (
    <form className="w-full max-w-sm" action="/api/login" method="post">
      <div className="flex flex-wrap">
        <Input {...{ id: 'password', name: 'password', type: 'password', borderColor: inputBorderColor, focusColor: inputFocusBorderColor }}>
          {isIncorrectPassword ? (
              <div className={`text-xs ${colors.ERROR_TEXT} py-1 px-4`}>{t('incorrect-password')}</div>
            ) : null}
        </Input>
        
        <Spacer />

        <Button text={t('login')} />
      </div>
    </form>
  );
}
