import {BaseSort} from './baseSort'

export class Gnome extends BaseSort {
        static title = "Gnome Sort"
        currentGnome: number

        setUpNext() {
            if (this.baseNode === 0 || !this.lastSwapped) {
                this.currentGnome++
                this.comparisonNode = this.currentGnome
                this.baseNode = this.currentGnome - 1
            } else if (this.lastSwapped) {
                this.baseNode--
                this.comparisonNode--
            }
            if (this.comparisonNode >= this.length) {
                this.done = true
            }
        }

        setUp() {
            this.currentGnome = 1
        }
    }
