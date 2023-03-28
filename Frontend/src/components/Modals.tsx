import { Dialog, DialogContent, DialogContentText, DialogTitle, Button, DialogActions, DialogProps } from "@mui/material";

interface ConfirmationModalProps extends DialogProps {
  title: string,
  content: string,
  onCancel: () => void,
  onConfirm: () => void,
}

interface NoticeModalProps extends DialogProps {
  title: string,
  content: string,
  onOkay: () => void,
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, content, onCancel, onConfirm, ...props }) => (
  <Dialog {...props}>
    <DialogTitle >
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="secondary">Cancel</Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </DialogActions>
  </Dialog>
)

export const NoticeModal: React.FC<NoticeModalProps> = ({ title, content, onOkay, ...props }) => (
  <Dialog {...props}>
    <DialogTitle >
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onOkay}>Okay</Button>
    </DialogActions>
  </Dialog>
)

