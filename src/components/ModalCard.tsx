import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import type { IconName } from '../design-system/Icon';
import Icon from '../design-system/Icon';

export type ModalCardProps = {
  visible: boolean;
  title: string;
  content: string | React.ReactNode;
  onClose: () => void;
  primaryAction?: { label: string; onPress: () => void; icon?: IconName };
};

export function ModalCard({ visible, title, content, onClose, primaryAction }: ModalCardProps) {
  if (!visible) return null;
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalBody}>
          {typeof content === 'string' ? <Text style={styles.modalText}>{content}</Text> : content}
        </ScrollView>
        {primaryAction && (
          <View style={styles.modalFooter}>
            <Button
              mode="contained"
              onPress={primaryAction.onPress}
              style={styles.primaryButton}
              labelStyle={styles.primaryButtonText}
              icon={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  modalTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '600' },
  closeButton: { padding: 4 },
  modalBody: { padding: 20, maxHeight: 400 },
  modalText: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  modalFooter: { padding: 20, borderTopWidth: 1, borderTopColor: colors.surface },
  primaryButton: { backgroundColor: colors.headerBackground, borderRadius: 8 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
