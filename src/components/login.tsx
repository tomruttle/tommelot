import { useTranslations } from "next-intl";
import { States } from "../utils/states";
import { isString } from "../utils/shared";
import Input from "./form/input";
import Spacer from "./form/spacer";
import Button from "./form/button";

export default function Login({ searchState }: { searchState?: string }) {
  const t = useTranslations();

  const isIncorrectPassword = isString(searchState) && searchState === States.Incorrect.toString();
  const inputBorderColor = isIncorrectPassword ? 'border-red-500' : 'border-gray-200';
  const inputFocusBorderColor = isIncorrectPassword ? 'focus:border-red-600' : 'focus:border-gray-300'

  return (
    <form className="w-full max-w-sm" action="/api/login" method="post">
      <div className="sm:flex">
        <Input {...{ id: 'password', name: 'password', type: 'password', borderColor: inputBorderColor, focusColor: inputFocusBorderColor }}>
          {isIncorrectPassword ? (
              <div className="text-xs text-red-500 py-1 px-4">{t('incorrect-password')}</div>
            ) : null}
        </Input>
        
        <Spacer />

        <Button text={t('enter')} />
      </div>
    </form>
  );
}
