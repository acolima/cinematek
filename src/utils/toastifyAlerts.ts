import { toast } from 'react-toastify'

export function errorAlert(message: string) {
	toast.error(message, {
		position: toast.POSITION.TOP_RIGHT
	})
}

export function successAlert(message: string) {
	toast.success(message, {
		position: toast.POSITION.TOP_RIGHT
	})
}
