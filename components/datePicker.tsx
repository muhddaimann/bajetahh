import React, { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../contexts/designContext";

type Variant = "single" | "range";

type DatePickerContentProps = {
  variant?: Variant;
  value?: Date | null;
  onChange?: (date: Date) => void;
  rangeValue?: {
    start: Date | null;
    end: Date | null;
  };
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  onConfirm?: () => void;
};

export function DatePickerContent({
  variant = "single",
  value,
  onChange,
  rangeValue,
  onRangeChange,
  onConfirm,
}: DatePickerContentProps) {
  const theme = useTheme();
  const tokens = useDesign();
  const { spacing, radii, typography } = tokens;

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [tempSingle, setTempSingle] = useState<Date | null>(value || null);

  const [tempRange, setTempRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>(
    rangeValue || {
      start: null,
      end: null,
    },
  );

  const monthLabel = useMemo(() => {
    return currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonth]);

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    let startOffset = firstDay.getDay() - 1;

    if (startOffset < 0) startOffset = 6;

    const result = [];

    for (let i = 0; i < startOffset; i++) {
      result.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      result.push(new Date(year, month, day));
    }

    return result;
  }, [currentMonth]);

  const isSameDay = (a?: Date | null, b?: Date | null) => {
    if (!a || !b) return false;

    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  };

  const isInRange = (date: Date) => {
    if (!tempRange.start || !tempRange.end) return false;

    return date >= tempRange.start && date <= tempRange.end;
  };

  const handleSelect = (date: Date) => {
    if (variant === "single") {
      setTempSingle(date);
      return;
    }

    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({
        start: date,
        end: null,
      });

      return;
    }

    if (date < tempRange.start) {
      setTempRange({
        start: date,
        end: tempRange.start,
      });

      return;
    }

    setTempRange({
      start: tempRange.start,
      end: date,
    });
  };

  const handleConfirm = () => {
    if (variant === "single" && tempSingle) {
      onChange?.(tempSingle);
    }

    if (variant === "range") {
      onRangeChange?.(tempRange);
    }

    onConfirm?.();
  };

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <View style={{ gap: spacing.xl }}>
      <View
        style={{
          padding: spacing.lg,
          borderRadius: radii["2xl"],
          backgroundColor: theme.colors.surfaceVariant,
          gap: spacing.md,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1,
                ),
              )
            }
            style={{
              width: 44,
              height: 44,
              borderRadius: radii.full,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surface,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>

          <View style={{ alignItems: "center", gap: 2 }}>
            <Text
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                color: theme.colors.onSurface,
              }}
            >
              {monthLabel}
            </Text>

            <Text
              style={{
                fontSize: typography.sizes.sm,
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {variant === "single"
                ? tempSingle
                  ? tempSingle.toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })
                  : "Select a date"
                : tempRange.start && tempRange.end
                  ? `${tempRange.start.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })} - ${tempRange.end.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}`
                  : "Select range"}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1,
                ),
              )
            }
            style={{
              width: 44,
              height: 44,
              borderRadius: radii.full,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surface,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: spacing.xs,
        }}
      >
        {weekDays.map((item) => (
          <View
            key={item}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: typography.sizes.xs,
                color: theme.colors.onSurfaceVariant,
                fontWeight: typography.weights.bold,
                letterSpacing: 0.6,
                textTransform: "uppercase",
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: spacing.sm,
        }}
      >
        {days.map((date, index) => {
          if (!date) {
            return (
              <View
                key={`empty-${index}`}
                style={{
                  width: `${100 / 7}%`,
                  aspectRatio: 1,
                }}
              />
            );
          }

          const selected =
            variant === "single"
              ? isSameDay(tempSingle, date)
              : isSameDay(tempRange.start, date) ||
                isSameDay(tempRange.end, date);

          const inRange = variant === "range" && isInRange(date);

          const isToday = isSameDay(today, date);

          const isRangeStart = isSameDay(tempRange.start, date);

          const isRangeEnd = isSameDay(tempRange.end, date);

          return (
            <View
              key={date.toISOString()}
              style={{
                width: `${100 / 7}%`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 48,
                  justifyContent: "center",
                  alignItems:
                    isRangeStart || selected
                      ? "flex-start"
                      : isRangeEnd
                        ? "flex-end"
                        : "center",
                  backgroundColor:
                    inRange && !selected
                      ? `${theme.colors.primary}14`
                      : "transparent",
                  borderTopLeftRadius:
                    isRangeStart || selected ? radii.full : 0,
                  borderBottomLeftRadius:
                    isRangeStart || selected ? radii.full : 0,
                  borderTopRightRadius:
                    isRangeEnd || selected ? radii.full : 0,
                  borderBottomRightRadius:
                    isRangeEnd || selected ? radii.full : 0,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleSelect(date)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: radii.full,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: selected
                      ? theme.colors.primary
                      : isToday
                        ? `${theme.colors.primary}16`
                        : theme.colors.surfaceVariant,
                    borderWidth: isToday && !selected ? 1.5 : 0,
                    borderColor: theme.colors.primary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: selected
                        ? typography.weights.bold
                        : typography.weights.semibold,
                      color: selected
                        ? theme.colors.onPrimary
                        : theme.colors.onSurface,
                    }}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: spacing.sm,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onConfirm}
          style={{
            flex: 1,
            height: 52,
            borderRadius: radii.full,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.surfaceVariant,
          }}
        >
          <Text
            style={{
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.semibold,
              color: theme.colors.onSurface,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleConfirm}
          style={{
            flex: 1,
            height: 52,
            borderRadius: radii.full,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Text
            style={{
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              color: theme.colors.onPrimary,
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type Props = {
  visible: boolean;
  onDismiss: () => void;
  variant?: Variant;
  value?: Date | null;
  onChange?: (date: Date) => void;
  rangeValue?: {
    start: Date | null;
    end: Date | null;
  };
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
};

export default function DatePicker({
  visible,
  onDismiss,
  variant = "single",
  value,
  onChange,
  rangeValue,
  onRangeChange,
}: Props) {
  const theme = useTheme();
  const tokens = useDesign();

  const { spacing, radii } = tokens;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          margin: spacing.lg,
          borderRadius: radii["2xl"],
          backgroundColor: theme.colors.surface,
          overflow: "hidden",
        }}
      >
        <View style={{ padding: spacing.xl }}>
          <DatePickerContent
            variant={variant}
            value={value}
            onChange={onChange}
            rangeValue={rangeValue}
            onRangeChange={onRangeChange}
            onConfirm={onDismiss}
          />
        </View>
      </Modal>
    </Portal>
  );
}