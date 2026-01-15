import { LabelValueItemProps } from "./label-value-item.props";
import { Icon, Text } from "@blueprintjs/core";

export function LabelValueItem<Dto extends object>(props: LabelValueItemProps<Dto>) {
  const defaultStringValue = props.default || "-";
  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        renderValue()
      }
    </>
  );

  function renderValue() {
    switch (props.fieldType) {
      case "boolean":
        return renderBoolean();
      case "number":
        return renderNumber();
      case "date":
        return renderDate();
      default:
        return renderText();
    }
  }

  function renderBoolean() {
    const asBoolean: boolean = props.viewmodel.dto[props.fieldName] as unknown as boolean || false;
    return (
      <Icon
        icon={asBoolean ? "tick" : "cross"}
        intent={asBoolean ? "success" : "danger"}
      />
    );
  }

  function renderNumber() {
    const asString: string | undefined = props.viewmodel.dto[props.fieldName] as unknown as string ?? defaultStringValue;
    return <Text>{asString}</Text>;
  }

  function renderDate() {
    const asString: string | undefined = props.viewmodel.dto[props.fieldName] as unknown as string ?? undefined;
    if (asString) {
      return new Date(asString)
        .toLocaleDateString(navigator.language, { day: "2-digit", month: "2-digit", year: "numeric" });
    } else {
      return <Text>{defaultStringValue}</Text>;
    }
  }

  function renderText() {
    const asString: string = props.viewmodel.dto[props.fieldName] as unknown as string ?? defaultStringValue;
    return <Text>{asString}</Text>;
  }
  // #endregion
}
