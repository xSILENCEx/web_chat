#pragma once

#include <QtCore/qglobal.h>

#ifndef BUILD_STATIC
# if defined(OTHERLIBRARY_LIB)
#  define OTHERLIBRARY_EXPORT Q_DECL_EXPORT
# else
#  define OTHERLIBRARY_EXPORT Q_DECL_IMPORT
# endif
#else
# define OTHERLIBRARY_EXPORT
#endif
