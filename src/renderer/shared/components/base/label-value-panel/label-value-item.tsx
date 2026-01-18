import { Icon, Text } from "@blueprintjs/core";
import { LabelValueItemProps } from "./label-value-item.props";

export function LabelValueItem<Dto extends object>(props: LabelValueItemProps<Dto>): JSX.Element {
  const defaultStringValue = props.default || "-";
  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        renderValue()
      }
    </>
  );

  function renderValue(): JSX.Element {
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

  function renderBoolean(): JSX.Element {
    const asBoolean: boolean = props.viewmodel.dto[props.fieldName] as unknown as boolean || false;
    return (
      <Icon
        icon={asBoolean ? "tick" : "cross"}
        intent={asBoolean ? "success" : "danger"}
      />
    );
  }

  function renderNumber(): JSX.Element {
    const asString: string = props.viewmodel.dto[props.fieldName] as unknown as string ?? defaultStringValue;
    return <Text>{asString}</Text>;
  }

  function renderDate(): JSX.Element {
    const asString: string | undefined = props.viewmodel.dto[props.fieldName] as unknown as string ?? undefined;
    if (asString) {
      return (
        <Text>
          {
            new Date(asString).toLocaleDateString(
              navigator.language,
              { day: "2-digit", month: "2-digit", year: "numeric" }
            )
          }
        </Text>
      );
    } else {
      return <Text>{defaultStringValue}</Text>;
    }
  }

  function renderText(): JSX.Element {
    const asString: string = props.viewmodel.dto[props.fieldName] as unknown as string ?? defaultStringValue;
    return <Text>{asString}</Text>;
  }
  // #endregion
}
