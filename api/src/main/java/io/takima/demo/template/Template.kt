package io.takima.demo.template

import javax.persistence.*

/**
 *
 */
@Entity(name = "templates")
data class Template(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "msg_note") var msgNote: String?,
        @Column(name = "title") var title: String?) {

    constructor() : this(null, null, null)

}